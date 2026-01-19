import { Avatar } from '@/modules/avatar';
import { Block } from '@/shared/Block';
import { deepEqual } from '@/shared/utils/deepEqual';

import type { ChatHeaderBlockProps, ChatHeaderProps } from './ChatHeader.types';
import { ChatOptionsPopover } from './components/ChatOptionsPopover';
import { OptionsControl } from './components/OptionsControl';

export class ChatHeader extends Block<ChatHeaderBlockProps> {
  constructor({
    avatar,
    onAddUser,
    onRemoveUser,
    onRemoveChat,
  }: ChatHeaderProps) {
    super({
      avatar: new Avatar(avatar),
      avatarProps: avatar,
      options: new OptionsControl({
        popoverContent: (onClose) =>
          new ChatOptionsPopover({
            onAddUser: () => {
              onAddUser();
              onClose();
            },
            onRemoveUser: () => {
              onRemoveUser();
              onClose();
            },
            onRemoveChat: () => {
              onRemoveChat();
              onClose();
            },
          }),
      }),
    });
  }

  componentDidUpdate(
    oldProps: ChatHeaderBlockProps,
    newProps: ChatHeaderBlockProps
  ): boolean {
    if (!deepEqual(oldProps.avatarProps, newProps.avatarProps)) {
      this.children.avatar = new Avatar(newProps.avatarProps);
      return true;
    }

    return super.componentDidUpdate(oldProps, newProps);
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
