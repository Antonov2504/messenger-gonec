import { Button } from '@/components/button';
import { Block } from '@/shared/Block';

import './ChatOptionsPopover.scss';
import type {
  ChatOptionsPopoverBlockProps,
  ChatOptionsPopoverProps,
} from './ChatOptionsPopover.types';

export class ChatOptionsPopover extends Block<ChatOptionsPopoverBlockProps> {
  constructor({
    onAddUser,
    onRemoveUser,
    onRemoveChat,
  }: ChatOptionsPopoverProps) {
    super({
      addUserButton: new Button({
        id: 'button-chat-add-user',
        text: 'Добавить пользователя',
        variant: 'secondary',
        iconType: 'add',
        onClick: onAddUser,
      }),
      removeUserButton: new Button({
        id: 'button-chat-remove-user',
        text: 'Удалить пользователя',
        variant: 'secondary',
        color: 'danger',
        iconType: 'cross',
        onClick: onRemoveUser,
      }),
      removeChatButton: new Button({
        id: 'button-remove-chat',
        text: 'Удалить чат',
        variant: 'secondary',
        iconType: 'trash',
        color: 'danger',
        onClick: onRemoveChat,
      }),
    });
  }

  protected render(): string {
    return `
      <div class="chat-options-popover">
        {{{addUserButton}}}
        {{{removeUserButton}}}
        {{{removeChatButton}}}
      </div>
    `;
  }
}
