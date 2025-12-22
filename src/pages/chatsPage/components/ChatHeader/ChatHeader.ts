import { Avatar } from '@/modules/avatar';
import { Block } from '@/shared/Block';

import type { ChatHeaderBlockProps, ChatHeaderProps } from './ChatHeader.types';
import { OptionsControl } from './components/OptionsControl';

export class ChatHeader extends Block<ChatHeaderBlockProps> {
  constructor({ header }: ChatHeaderProps) {
    super({
      avatar: new Avatar(header.avatar),
      options: new OptionsControl({
        onOpen: () => console.log('open options'),
      }),
    });
  }

  protected render(): string {
    return `
      <header class="chats-page__header">
        {{{avatar}}}
        {{{options}}}
      </header>
    `;
  }
}
