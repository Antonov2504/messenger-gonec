import { UserLogoutController } from '@/pages/authPage/controllers/UserLogout';
import type { AppState } from '@/services/store/types';
import { getAvatarUrl } from '@/shared/utils/string';

import type { ProfilePageMainProps } from './ProfilePage.types';
import { UserProfileController } from './controllers/UserProfileController';

export const mapUserToProps = (state: AppState): ProfilePageMainProps => {
  const user = state.user;
  const logoutController = UserLogoutController.getInstance();
  const profileController = UserProfileController.getInstance();

  if (!user) {
    return {
      mode: state.settings.mode,
      avatar: {
        src: '',
        alt: '',
        name: '',
        isEmpty: true,
        isEditable: true,
        type: 'column',
        size: 'l',
      },
      info: {
        id: '0',
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        avatar: '',
      },
      isLoadingLogout: state.settings.isLoadingLogout,
      onEdit: () => profileController.changeMode('edit'),
      onChangePassword: () => profileController.changeMode('changePassword'),
      onCancel: () => profileController.cancelEdit(),
      onLogout: () => logoutController.logout(),
    };
  }

  const {
    id,
    login,
    email,
    phone,
    avatar,
    first_name,
    second_name,
    display_name,
  } = user;

  return {
    mode: state.settings.mode,
    avatar: {
      src: avatar ? getAvatarUrl(avatar) : '',
      alt: avatar ? 'Аватар профиля' : '',
      name: first_name,
      isEmpty: !avatar,
      isEditable: true,
      type: 'column',
      size: 'l',
    },
    info: {
      id,
      email,
      login,
      first_name,
      second_name,
      display_name,
      phone,
      avatar,
    },
    onEdit: () => profileController.changeMode('edit'),
    onChangePassword: () => profileController.changeMode('changePassword'),
    onCancel: () => profileController.cancelEdit(),
    onLogout: () => logoutController.logout(),
    isLoadingLogout: state.settings.isLoadingLogout,
  };
};
