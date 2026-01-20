import type { AppState } from '@/services/store/types';

import type { ChatsPageSidebarProps } from './ChatsPage.types';

export const mapMessengerToSidebarProps = (
  state: AppState
): ChatsPageSidebarProps => {
  const { chats, activeChat } = state.messenger;

  return {
    sidebar: {
      activeChat,
      chats,
    },
  };
};
