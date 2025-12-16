import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';

import { EventBus } from '../EventBus';
import type { BaseProps, Props as BlockProps } from './Block.types';

export abstract class Block<P extends BlockProps = BaseProps & BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public props: P;
  public events: Record<string, EventListener> | undefined;
  public children: Record<string, Block | Block[]> = {};
  private _id: string = uuidv4();
  private _element: HTMLElement | null = null;
  private eventBus: () => EventBus;

  /**
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsWithChildren: P = {} as P) {
    const eventBus = new EventBus();
    const { props, children } = this._getPropsAndChildren(propsWithChildren);

    this.props = this._makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  protected _getChildArray<T extends Block>(key: string): T[] {
    const child = this.children[key];
    return Array.isArray(child) ? (child as T[]) : [];
  }

  protected _getPropsAndChildren(propsWithChildren: P) {
    const props: Partial<P> = {} as Partial<P>;
    const children: Record<string, Block | Block[]> = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.every((v) => v instanceof Block))
      ) {
        children[key] = value;
      } else {
        (props as Record<string, unknown>)[key] = value;
      }
    });

    return { props: props as P, children };
  }

  _makePropsProxy(props: P) {
    const propsProxy = new Proxy(props, {
      get: (target, prop) => {
        const value = (target as Record<string, unknown>)[prop as string];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldProps = { ...target };

        (target as Record<string, unknown>)[prop as string] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Отказано в доступе');
      },
    });

    return propsProxy;
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createDocumentElement<T extends HTMLElement = HTMLElement>(
    tagName: string
  ): T {
    return document.createElement(tagName) as T;
  }

  public init() {
    this._element = null;
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((block) => block.dispatchComponentDidMount());
      } else {
        value.dispatchComponentDidMount();
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentWillUnmount() {}

  _componentWillUnmount() {
    this.componentWillUnmount();
  }

  setProps(nextProps: Partial<P> | undefined) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  getContent() {
    return this.element;
  }

  private _replaceStub(fragment: HTMLTemplateElement, block: Block) {
    const stub = fragment.content.querySelector(`[data-id="${block._id}"]`);
    if (!stub) return;

    const blockElement = block.getContent();

    if (blockElement) {
      stub.replaceWith(blockElement);
    }
  }

  private _render() {
    // Собрать пропсы
    const propsAndStubs: P = { ...this.props };

    // Поменять пропсы-экземпляры класса Block на заглушки с id'шниками блоков
    Object.entries(this.children).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        (propsAndStubs as Record<string, unknown>)[key] = value
          .map((block) => `<div data-id=${block._id}></div>`)
          .join('');
      } else {
        (propsAndStubs as Record<string, unknown>)[key] =
          `<div data-id=${value._id}></div>`;
      }
    });

    // Создать template с содержимым в виде скомпилированной DOM ноды из шаблонной строки с использованием Handlebars
    const fragment =
      this._createDocumentElement<HTMLTemplateElement>('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    // Заменить в DOM фрагмента template содержимое заглушек на реальные ноды блоков
    Object.values(this.children).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((block) => this._replaceStub(fragment, block));
      } else {
        this._replaceStub(fragment, value);
      }
    });

    // Забрать DOM ноду фрагмента template
    const newElement = fragment.content.firstElementChild as HTMLElement;

    // Если в DOM уже существует нода блока, меняем ее на новую с обновленными пропсами
    if (this._element && newElement) {
      this._removeEvents(); // удаляем прослушивание событий со старой DOM ноды
      this._element.replaceWith(newElement);
    }
    // Обновляем ссылку на DOM ноду блока
    this._element = newElement;
    this._addEvents();
  }

  private _addEvents(): void {
    const events = this.props.events;

    if (!events || !Object.keys(events).length) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element) {
        this._element.addEventListener(event, listener as EventListener);
      }
    });
  }

  private _removeEvents() {
    const { events } = this.props;

    if (!events || !this._element) return;

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element) {
        this._element!.removeEventListener(event, listener as EventListener);
      }
    });
  }

  protected abstract render(): string;
}
