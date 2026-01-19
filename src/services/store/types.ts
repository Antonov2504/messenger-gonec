import type { ChatDto, UserDto } from '@/App.types';
import type { PageMode } from '@/pages/profilePage/ProfilePage.types';

type SettingsProps = {
  isLoadingLogout: boolean;
  mode: PageMode;
};

type MessengerProps = {
  chats: ChatDto[];
  users: UserDto[];
  usersToAdd: UserDto[];
  activeChat: ChatDto | null;
  activeChatLoading: boolean;
  token: string;
};

export type AppState = {
  user: UserDto | null;
  settings: SettingsProps;
  messenger: MessengerProps;
};
