import { Button } from '@/components/button';
import { Popover } from '@/modules/popover/Popover';
import { Block } from '@/shared/Block';

import './OptionsControl.scss';
import type {
  OptionsControlBlockProps,
  OptionsControlProps,
} from './OptionsControl.types';

export class OptionsControl extends Block<OptionsControlBlockProps> {
  private isOpened = false;

  constructor({ popoverContent }: OptionsControlProps) {
    super({
      buttonOptions: new Button({
        id: 'chats-page-header-options',
        variant: 'icon',
        icon: 'options',
        onClick: () => this.toggle(),
      }),
      popover: new Popover({
        isOpened: false,
        content: (onClose) => popoverContent(onClose),
        onClose: () => this.close(),
      }),
    });
  }

  private toggle() {
    this.isOpened = !this.isOpened;
    this.updatePopover();
  }

  private close() {
    this.isOpened = false;
    this.updatePopover();
  }

  private updatePopover() {
    const popover = this.children.popover as Popover;

    popover.setProps({
      isOpened: this.isOpened,
    });
  }

  render(): string {
    return `
      <div class="options-control">
        {{{buttonOptions}}}
        {{{popover}}}
      </div>
    `;
  }
}
