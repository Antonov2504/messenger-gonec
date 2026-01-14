import type { UserDto } from '@/App.types';
import type { PageMode } from '@/pages/profilePage/ProfilePage.types';

type SettingsProps = {
  isLoadingLogout: boolean;
  mode: PageMode;
};

export type AppState = {
  user: UserDto | null;
  settings: SettingsProps;
};
