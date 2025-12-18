import type { ChatDto } from '@/App.types';
import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import { Avatar } from '../avatar';
import './Chat.scss';
import type { ChatBlockProps } from './Chat.types';

export class Chat extends Block<ChatBlockProps> {
  constructor({ avatar, id, title, last_message, unread_count }: ChatDto) {
    super({
      avatar: new Avatar({
        size: 'm',
        src: avatar,
        alt: 'Аватар',
      }),
      id,
      title,
      lastMessageTime: last_message.time,
      lastMessageContent: last_message.content,
      unreadCount: unread_count,
    });
  }

  protected render(): string {
    const { id } = this.props;

    const className = getClassName(['chat', id === '1' && 'chat_active']);

    return `
    <li>
      <article class="${className}" data-id={{id}}>
        {{{avatar}}}

        <div class="chat__info">
          <header class="chat__header">
            <h3 class="chat__title">{{title}}</h3>
            <time class="chat__time" datetime="2025-11-30T20:29">{{lastMessageTime}}</time>
          </header>

          <div class="chat__meta">
            <p class="chat__preview">{{lastMessageContent}}</p>
            <p class="chat__unread">{{unreadCount}}</p>
          </div>
        </div>
      </article>
    </li>
    `;
  }
}
