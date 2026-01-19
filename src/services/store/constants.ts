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
    usersToAdd: [],
    activeChat: null,
    activeChatLoading: false,
    token: '',
  },
};
