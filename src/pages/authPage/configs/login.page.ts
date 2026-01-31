import { routes } from '@/App.constants';
import { Link } from '@/components/link';
import { Form } from '@/modules/form';
import type { Validator } from '@/modules/formController';
import type { BasePageConfig } from '@/pages/PageFactory';
import { UserLoginController } from '@/pages/authPage/controllers/UserLogin';
import type { LoginFormModel } from '@/pages/authPage/models/LoginFormModel';
import { requiredValidator } from '@/shared/constants/formValidators';

import { AuthPageMain } from '../AuthPageMain';

export const loginFormValidators: Record<string, Validator[]> = {
  login: [requiredValidator()],
  password: [requiredValidator()],
};

export const loginPageConfig: BasePageConfig = {
  authRequired: false,
  content: () => {
    const loginController = new UserLoginController(
      (isLoading) => {
        loginForm.setLoading(isLoading);
      },
      () => loginForm.reset()
    );

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

    return new AuthPageMain({
      title: 'Вход',
      form: loginForm,
      link: new Link({
        text: 'Еще не зарегистрированы?',
        to: routes.signup,
        className: 'link',
      }),
    });
  },
};
