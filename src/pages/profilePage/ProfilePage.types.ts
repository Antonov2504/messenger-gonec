import type { UserDto } from '@/App.types';
import type { Avatar, AvatarProps } from '@/modules/avatar';
import type { Props as BlockProps } from '@/shared/Block';

import type { ProfileActions } from './components/ProfileActions';
import type { ProfileInfo } from './components/ProfileInfo';
import type { ProfileInfoForm } from './components/ProfileInfoForm';
import type { ProfilePasswordForm } from './components/ProfilePasswordForm';
import type { PAGE_MODE } from './profile.page';

export type ProfilePageMainProps = {
  avatar: AvatarProps;
  info: UserDto;
  onLogout: () => void;
};

export type PageMode = keyof typeof PAGE_MODE;

export type ProfilePageMainBlockProps = BlockProps & {
  mode: PageMode;
  avatar: Avatar;
  name: string;
  view: ProfileInfo;
  edit: ProfileInfoForm;
  changePassword: ProfilePasswordForm;
  actions: ProfileActions;
};
