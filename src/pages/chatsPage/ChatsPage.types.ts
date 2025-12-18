import type { ChatDto } from '@/App.types';
import type { Field } from '@/components/field';
import type { Link } from '@/components/link';
import type { AvatarProps } from '@/modules/avatar';
import type { Chat } from '@/modules/chat';
import type { Props as BlockProps } from '@shared/Block';

import type { ChatHeader } from './components/ChatHeader';
import type { ChatMessageControl } from './components/ChatMessageControl';

export type ChatsPageMainProps = {
  header: {
    avatar: AvatarProps;
  };
  feed: {
    isEmpty: boolean;
  };
};

export type ChatsPageMainBlockProps = BlockProps & {
  header: ChatHeader;
  messageControl: ChatMessageControl;
};

export type ChatsPageSidebarProps = {
  sidebar: {
    activeChatId: string;
    chats: ChatDto[];
  };
};

export type ChatsPageSidebarBlockProps = BlockProps & {
  link: Link;
  search: Field;
  chats: Chat[];
};
