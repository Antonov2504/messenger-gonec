import { appFooterTemplateLinks } from '@/App.constants';
import { Link } from '@/components/link';
import { Form } from '@/modules/form';
import type { Validator } from '@/modules/formController';
import type { BasePageConfig } from '@/pages/PageFactory';
import {
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

import { AuthPageMain } from '../AuthPageMain';

export const registerFormValidators: Record<string, Validator[]> = {
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
  phone: [requiredValidator(), phoneValidator()],
  password: [
    requiredValidator(),
    passwordLengthValidator(),
    passwordUppercaseValidator(),
    passwordDigitValidator(),
  ],
  password_repeat: [passwordRepeatValidator()],
};

export const registerPageConfig: BasePageConfig = {
  content: new AuthPageMain({
    title: 'Регистрация',
    form: new Form({
      id: 'register-form',
      fields: [
        {
          id: 'email-input',
          name: 'email',
          inputType: 'email',
          label: 'Почта',
          required: true,
        },
        {
          id: 'login-input',
          name: 'login',
          inputType: 'text',
          label: 'Логин',
          required: true,
        },
        {
          id: 'first-name-input',
          name: 'first_name',
          inputType: 'text',
          label: 'Имя',
          required: true,
        },
        {
          id: 'second-name-input',
          name: 'second_name',
          inputType: 'text',
          label: 'Фамилия',
        },
        {
          id: 'phone-input',
          name: 'phone',
          inputType: 'text',
          label: 'Телефон',
          required: true,
        },
        {
          id: 'password-input',
          name: 'password',
          inputType: 'password',
          label: 'Пароль',
          required: true,
        },
        {
          id: 'password-repeat-input',
          name: 'password_repeat',
          inputType: 'password',
          label: 'Пароль (еще раз)',
          required: true,
        },
      ],
      validators: registerFormValidators,
      submitButton: {
        id: 'button-login',
        text: 'Зарегистрироваться',
        type: 'submit',
      },
      onSubmit: (values) => console.log(values),
    }),
    link: new Link({
      text: 'Войти',
      to: 'login',
      className: 'link',
    }),
  }),
  footer: {
    links: appFooterTemplateLinks,
  },
};
