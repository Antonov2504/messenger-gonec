import type { ChatDto } from '@/App.types';
import type { Button } from '@/components/button';
import type { Field } from '@/components/field';
import type { Link } from '@/components/link';
import type { AvatarUploadPopup } from '@/modules/AvatarUploadPopup';
import type { Chat } from '@/modules/chat';
import type { Props as BlockProps } from '@shared/Block';

import type { AddChatPopup } from './components/AddChatPopup';
import type { AddUserPopup } from './components/AddUserPopup';
import type { ChatHeader } from './components/ChatHeader';
import type { ChatMessageControl } from './components/ChatMessageControl';
import type { RemoveUserPopup } from './components/RemoveUserPopup';

export type ChatsPageMainProps = {
  activeChat: ChatDto | null;
};

export type ChatsPageMainBlockProps = BlockProps & {
  header: ChatHeader;
  messageControl: ChatMessageControl;
  activeChat: ChatDto | null;
  avatarPopup: AvatarUploadPopup;
  addUserPopup: AddUserPopup;
  removeUserPopup: RemoveUserPopup;
};

export type ChatsPageSidebarProps = {
  sidebar: {
    activeChat: ChatDto | null;
    chats: ChatDto[];
  };
};

export type ChatsPageSidebarBlockProps = BlockProps & {
  link: Link;
  search: Field;
  chats: Chat[];
  addChatButton: Button;
  addChatPopup: AddChatPopup;
  sidebar: ChatsPageSidebarProps['sidebar'];
};

export type ChatsParams = {
  offset: number;
  limit: number;
  title: string;
};

export type ChatPopups = 'addUser' | 'removeUser' | 'uploadAvatar' | null;

export type GetChatUsersParams = {
  offset: number;
  limit: number;
  name: string;
  email: string;
};

export type AddUserRequest = {
  chatId: number;
  users: number[];
};
