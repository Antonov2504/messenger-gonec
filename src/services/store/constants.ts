import type { AppState } from './types';

export const initialState: AppState = {
  user: null,
  settings: {
    isLoadingLogout: false,
    mode: 'view',
  },
  messenger: {
    chats: [],
    users: [],
    messages: [],
    usersToAdd: [],
    activeChat: null,
    activeChatLoading: false,
  },
};
