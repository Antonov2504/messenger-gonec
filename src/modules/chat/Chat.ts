import { Image } from '@/components/image';
import { Block } from '@/shared/Block';
import { formatLastMessageDate } from '@/shared/utils/date';
import { getAvatarUrl, getClassName } from '@/shared/utils/string';

import { Avatar } from '../avatar';
import './Chat.scss';
import type { ChatBlockProps, ChatProps } from './Chat.types';

export class Chat extends Block<ChatBlockProps> {
  constructor({
    avatar,
    id,
    title,
    last_message,
    unread_count,
    isActive,
    onClick,
  }: ChatProps) {
    super({
      avatar: new Avatar({
        size: 'm',
        src: avatar ? getAvatarUrl(avatar) : '',
        alt: avatar ? 'Аватар' : '',
        isEmpty: !avatar,
      }),
      id,
      title,
      userLogin: last_message?.user.login ?? '',
      lastMessageTime: formatLastMessageDate(last_message?.time ?? ''),
      lastMessageContent: last_message?.content ?? '',
      unreadCount: unread_count,
      events: {
        click: onClick,
      },
      isActive,
    });
  }

  updateAvatar(src: string) {
    const avatar = this.children.avatar as Avatar;
    const avatarImage = avatar.children.image as Image;

    avatar.setProps({
      isEmpty: !src,
    });

    avatarImage.setProps({
      src: src ? getAvatarUrl(src) : '',
      alt: src ? 'Аватар' : '',
    });
  }

  componentDidUpdate(
    oldProps: ChatBlockProps,
    newProps: ChatBlockProps
  ): boolean {
    if (oldProps.isActive !== newProps.isActive) {
      this.element?.children[0].classList.toggle(
        'chat_active',
        newProps.isActive
      );
      return false;
    }

    return true;
  }

  protected render(): string {
    const { unreadCount, isActive, userLogin } = this.props;

    const className = getClassName(['chat', isActive && 'chat_active']);

    const renderUnreadCount = () => {
      if (unreadCount) {
        return '<p class="chat__unread">{{unreadCount}}</p>';
      }

      return '';
    };

    return `
    <li>
      <article class="${className}" data-id={{id}}>
        {{{avatar}}}

        <div class="chat__info">
          <header class="chat__header">
            <h3 class="chat__title">{{title}}</h3>
            <time class="chat__time" datetime="{{lastMessageTime}}">{{lastMessageTime}}</time>
          </header>

          <div class="chat__meta">
            <p class="chat__preview">
              <span class="chat__user-login">${userLogin ? userLogin + ': ' : ''}</span>
              {{lastMessageContent}}
            </p>
            ${renderUnreadCount()}
          </div>
        </div>
      </article>
    </li>
    `;
  }
}
