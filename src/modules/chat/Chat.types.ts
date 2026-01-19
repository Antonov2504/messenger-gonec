import type { ChatDto } from '@/App.types';
import type { Props as BlockProps } from '@/shared/Block';

import type { Avatar } from '../avatar';

export type ChatProps = ChatDto & {
  isActive: boolean;
  onClick: (e?: MouseEvent) => void;
};

export type ChatBlockProps = BlockProps & {
  id: number;
  avatar: Avatar;
  title: string;
  lastMessageTime: string;
  lastMessageContent: string;
  unreadCount: number;
  isActive: boolean;
};
