import { Block } from '@/shared/Block';

import './Popup.scss';
import type { PopupBlockProps, PopupProps } from './Popup.types';

export class Popup extends Block<PopupBlockProps> {
  contentFactory: () => Block;

  constructor({ content, ...rest }: PopupProps) {
    super({
      ...rest,
      content: content(),
      events: {
        click: (e: Event) => this._handleClickOverlay(e),
      },
    });

    this.contentFactory = content;
  }

  private _handleClickOverlay(e: Event) {
    const target = e.target as HTMLElement;

    if (target.classList.contains('popup')) {
      this.props.onClose();
    }
  }

  componentDidUpdate(
    oldProps: PopupBlockProps,
    newProps: PopupBlockProps
  ): boolean {
    if (oldProps.isOpened !== newProps.isOpened) {
      this._toggleOpened(newProps.isOpened);

      if (newProps.isOpened) {
        this.children.content = this.contentFactory();
        return true;
      }

      return false;
    }

    return false;
  }

  private _toggleOpened(isOpened: boolean) {
    if (!this.element) return;

    this.element.classList.toggle('popup_opened', isOpened);
  }

  render() {
    return `
      <div class="popup${this.props.isOpened ? ' popup_opened' : ''}">
        <div class="popup__content">
          {{{content}}}
        </div>
      </div>
    `;
  }
}
