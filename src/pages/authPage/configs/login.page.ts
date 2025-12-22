import { appFooterTemplateLinks } from '@/App.constants';
import { Link } from '@/components/link';
import { Form } from '@/modules/form';
import type { Validator } from '@/modules/formController';
import type { BasePageConfig } from '@/pages/PageFactory';
import { requiredValidator } from '@/shared/constants/formValidators';

import { AuthPageMain } from '../AuthPageMain';

export const loginFormValidators: Record<string, Validator[]> = {
  login: [requiredValidator()],
  password: [requiredValidator()],
};

export const loginPageConfig: BasePageConfig = {
  content: new AuthPageMain({
    title: 'Вход',
    form: new Form({
      id: 'login-form',
      fields: [
        {
          id: 'login-input',
          name: 'login',
          inputType: 'text',
          label: 'Логин',
          required: true,
        },
        {
          id: 'password-input',
          name: 'password',
          inputType: 'password',
          label: 'Пароль',
          required: true,
        },
      ],
      validators: loginFormValidators,
      submitButton: {
        id: 'button-login',
        text: 'Войти',
        type: 'submit',
        fullWidth: true,
      },
      onSubmit: (values) => console.log({ values }),
    }),
    link: new Link({
      text: 'Еще не зарегистрированы?',
      to: 'signup',
      className: 'link',
    }),
  }),
  footer: {
    links: appFooterTemplateLinks,
  },
};
