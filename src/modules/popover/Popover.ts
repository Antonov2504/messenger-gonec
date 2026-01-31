import { Block } from '@/shared/Block';

import './Popover.scss';
import type { PopoverBlockProps, PopoverProps } from './Popover.types';

export class Popover extends Block<PopoverBlockProps> {
  contentFactory: (onClose: () => void) => Block;

  constructor(props: PopoverProps) {
    super({
      ...props,
      content: props.content(() => props.onClose()),
      events: {
        click: (e: Event) => this._handleClickOverlay(e),
      },
    });

    this.contentFactory = props.content;
  }

  private _handleClickOverlay(e: Event) {
    const overlay = this.element?.querySelector('.popover__overlay');

    if (!overlay) {
      return;
    }

    const target = e.target as HTMLElement;
    if (target === overlay) {
      this.props.onClose?.();
    }
  }

  componentDidUpdate(
    oldProps: PopoverBlockProps,
    newProps: PopoverBlockProps
  ): boolean {
    if (oldProps.isOpened !== newProps.isOpened) {
      this._toggleOpened(newProps.isOpened);
      return true;
    }

    return false;
  }

  private _toggleOpened(isOpened: boolean) {
    if (!this.element) {
      return;
    }

    this.element.classList.toggle('popover_opened', isOpened);
  }

  render(): string {
    return `
      <div class="popover ${this.props.isOpened ? 'popover_opened' : ''}">
        <div class="popover__overlay"></div>
        <div class="popover__content">
          {{{content}}}
        </div>
      </div>
    `;
  }
}
