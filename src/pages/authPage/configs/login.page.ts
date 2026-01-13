import { routes } from '@/App.constants';
import { Link } from '@/components/link';
import { UserLoginController } from '@/controllers/auth/UserLogin';
import type { LoginFormModel } from '@/models/LoginFormModel';
import { Form } from '@/modules/form';
import type { Validator } from '@/modules/formController';
import type { BasePageConfig } from '@/pages/PageFactory';
import { requiredValidator } from '@/shared/constants/formValidators';

import { AuthPageMain } from '../AuthPageMain';

export const loginFormValidators: Record<string, Validator[]> = {
  login: [requiredValidator()],
  password: [requiredValidator()],
};

const loginController = new UserLoginController((isLoading) => {
  loginForm.setLoading(isLoading);
});

const loginForm = new Form({
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
  onSubmit: (values) => loginController.login(values as LoginFormModel),
});

export const loginPageConfig: BasePageConfig = {
  content: new AuthPageMain({
    title: 'Вход',
    form: loginForm,
    link: new Link({
      text: 'Еще не зарегистрированы?',
      to: routes.signup,
      className: 'link',
    }),
  }),
};
