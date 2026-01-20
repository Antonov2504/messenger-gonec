import { Avatar } from '@/modules/avatar';
import { Block } from '@/shared/Block';
import { formatDateToHoursMinutes } from '@/shared/utils/date';
import { getAvatarUrl } from '@/shared/utils/string';

import './ChatMessage.scss';
import type {
  ChatMessageBlockProps,
  ChatMessageProps,
} from './ChatMessage.types';

export class ChatMessage extends Block<ChatMessageBlockProps> {
  constructor({ avatar, ...props }: ChatMessageProps) {
    super({
      ...props,
      avatarBlock: new Avatar({
        size: 's',
        src: avatar ? getAvatarUrl(avatar) : '',
        alt: avatar ? 'Аватар' : '',
        name: '',
        isEmpty: !avatar,
        isEditable: false,
      }),
    });
  }

  render(): string {
    const { message, isActive } = this.props;
    const messageTime = formatDateToHoursMinutes(new Date(message.time));

    return `
      <div class="chat-message">
        <div class="chat-message__container">
            {{{avatarBlock}}}
            <div class="chat-message__message${isActive ? ' chat-message__message_active' : ''}">
              <div class="chat-message__text">${message.content}</div>
              <div class="chat-message__time">${messageTime}</div>
            </div>
        </div>
      </div>
    `;
  }
}
