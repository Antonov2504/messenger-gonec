import type { UserDto, WSMessageDto } from '@/App.types';
import type { Props } from '@/shared/Block';

import type { ChatMessage } from './components/ChatMessage';

export type ChatFeedProps = {
  isLoading: boolean;
  isActive: boolean;
  messages: WSMessageDto[];
  users: UserDto[];
  currentUserId: number | null;
  onLoadMore: () => void;
};

export type ChatFeedBlockProps = Props & {
  isLoading: boolean;
  isActive: boolean;
  messages: WSMessageDto[];
  users: UserDto[];
  messageBlocks: ChatMessage[];
  currentUserId: number | null;
};
