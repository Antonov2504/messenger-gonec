import type { Props as BlockProps } from '@/shared/Block';

import type { Avatar } from '../avatar';

export type ChatBlockProps = BlockProps & {
  id: string;
  avatar: Avatar;
  title: string;
  lastMessageTime: string;
  lastMessageContent: string;
  unreadCount: number;
};
