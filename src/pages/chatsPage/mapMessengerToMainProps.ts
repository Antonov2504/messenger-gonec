import type { AppState } from '@/services/store/types';

import type { ChatsPageMainProps } from './ChatsPage.types';

export const mapMessengerToMainProps = (
  state: AppState
): ChatsPageMainProps => {
  const { activeChat } = state.messenger;
  return { activeChat };
};
