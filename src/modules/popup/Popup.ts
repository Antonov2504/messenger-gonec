import { Block } from '@/shared/Block';

import './Popup.scss';
import type { PopupBlockProps, PopupProps } from './Popup.types';

export class Popup extends Block<PopupBlockProps> {
  constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => this._handleClickOverlay(e),
      },
    });
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
