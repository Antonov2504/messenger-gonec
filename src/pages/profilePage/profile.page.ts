import { routes } from '@/App.constants';
import { Button } from '@/components/button';
import type { Validator } from '@/modules/formController';
import type { BasePageConfig } from '@/pages/PageFactory';
import { connect } from '@/services/store';
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
import { mapUserToProps } from './mapUserToProps';

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

const ProfilePageMainConnected = connect(ProfilePageMain, mapUserToProps);
const userProfile = new ProfilePageMainConnected({});

export const profilePageConfig: BasePageConfig = {
  sidebarType: 'back',
  buttonBack: new Button({
    id: 'page-layout-button-back',
    variant: 'primary-icon',
    icon: 'back',
    onClick: () => router.go(routes.chats),
  }),
  content: userProfile,
};
