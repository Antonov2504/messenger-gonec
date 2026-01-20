import { connect } from '@/services/store';
import type { AppState } from '@/services/store/types';

import { ChatsController } from '../../controllers/ChatsController';
import { ChatFeed } from './ChatFeed';
import type { ChatFeedProps } from './ChatFeed.types';

const chatsController = ChatsController.getInstance();

export const ChatFeedConnected = connect(
  ChatFeed,
  (state: AppState): ChatFeedProps => ({
    isLoading: state.messenger.activeChatLoading ?? false,
    isActive: !!state.messenger.activeChat,
    messages: state.messenger.messages || [],
    users: state.messenger.users,
    currentUserId: state.user?.id ?? null,
    onLoadMore: () => chatsController.getOldMessages(),
  })
);
