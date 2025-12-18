import type { Props as BlockProps } from '@/shared/Block';

import type { Avatar } from '../avatar';

export type ChatBlockProps = BlockProps & {
  avatar: Avatar;
  id: str;
  title: string;
  lastMessageTime: string;
  lastMessageContent: string;
  unreadCount: number;
};
