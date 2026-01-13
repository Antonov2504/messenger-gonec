import { routes } from '@/App.constants';
import AvatarAlex from '@/assets/images/avatar.jpg';
import { Button } from '@/components/button';
import { UserLogoutController } from '@/controllers/auth/UserLogout';
import type { Validator } from '@/modules/formController';
import type { BasePageConfig } from '@/pages/PageFactory';
import { router } from '@/shared/Router';
import {
  displayCharsetValidator,
  emailDomainLettersValidator,
  emailFormatValidator,
  loginCharsetValidator,
  loginLengthValidator,
  loginNotOnlyDigitsValidator,
  nameValidator,
  passwordDigitValidator,
  passwordLengthValidator,
  passwordRepeatValidator,
  passwordUppercaseValidator,
  phoneValidator,
  requiredValidator,
} from '@/shared/constants/formValidators';

import { ProfilePageMain } from './ProfilePageMain';
import type { ProfileActions } from './components/ProfileActions';

export const editProfileFormValidators: Record<string, Validator[]> = {
  email: [
    requiredValidator(),
    emailFormatValidator(),
    emailDomainLettersValidator(),
  ],
  login: [
    requiredValidator(),
    loginLengthValidator(),
    loginCharsetValidator(),
    loginNotOnlyDigitsValidator(),
  ],
  first_name: [requiredValidator(), nameValidator()],
  second_name: [nameValidator()],
  display_name: [
    displayCharsetValidator(),
    loginNotOnlyDigitsValidator('Имя не может состоять только из цифр'),
  ],
  phone: [requiredValidator(), phoneValidator()],
};

export const changePasswordFormValidators: Record<string, Validator[]> = {
  oldPassword: [requiredValidator()],
  password: [
    requiredValidator(),
    passwordLengthValidator(),
    passwordUppercaseValidator(),
    passwordDigitValidator(),
  ],
  password_repeat: [passwordRepeatValidator()],
};

export const PAGE_MODE = {
  view: {
    content: 'view',
    showActions: true,
  },
  edit: {
    content: 'edit',
    showActions: false,
  },
  changePassword: {
    content: 'changePassword',
    showActions: false,
  },
} as const;

const logoutController = new UserLogoutController((isLoading) => {
  const actions = profileContent.children.actions as ProfileActions;
  actions.setLoadingLogout(isLoading);
});

const profileContent = new ProfilePageMain({
  avatar: {
    isEmpty: false,
    isEditable: false,
    src: AvatarAlex,
    alt: 'Личность профиля',
    name: 'Александр',
    type: 'column',
    size: 'l',
  },
  info: {
    id: '1',
    avatar: AvatarAlex,
    email: 'username@yandex.ru',
    login: 'username',
    first_name: 'Александр',
    second_name: 'Пушкин',
    display_name: 'pushkin',
    phone: '+70906061799',
  },
  // onUpdate: () => userController.update(),
  // onChangePassword: () => userController.changePassword(),
  onLogout: () => logoutController.logout(),
});

export const profilePageConfig: BasePageConfig = {
  sidebarType: 'back',
  buttonBack: new Button({
    id: 'page-layout-button-back',
    variant: 'primary-icon',
    icon: 'back',
    onClick: () => router.go(routes.chats),
  }),
  content: profileContent,
};
