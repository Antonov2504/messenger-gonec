import { Button } from '@/components/button';
import { Block } from '@/shared/Block';

import type {
  OptionsControlBlockProps,
  OptionsControlProps,
} from './OptionsControl.types';

export class OptionsControl extends Block<OptionsControlBlockProps> {
  constructor({ onOpen }: OptionsControlProps) {
    super({
      buttonOptions: new Button({
        id: 'chats-page-header-options',
        variant: 'icon',
        icon: 'options',
        onClick: onOpen,
      }),
    });
  }

  protected render(): string {
    return `{{{buttonOptions}}}`;
  }
}
