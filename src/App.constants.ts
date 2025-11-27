import type { LinkProps } from './components/link';
import type { PageKey, PagePropsMap } from './pages';

const loginPageTemplateData: PagePropsMap['login'] = {
  title: 'Вход',
  form: {
    id: 'login-form',
    fields: [
      {
        id: 'login-input',
        name: 'login',
        inputType: 'text',
        label: 'Логин',
      },
      {
        id: 'password-input',
        name: 'password',
        inputType: 'password',
        label: 'Пароль',
      },
    ],
    button: {
      id: 'button-login',
      text: 'Войти',
      type: 'submit',
    },
  },
  link: {
    text: 'Еще не зарегистрированы?',
    to: 'signup',
  },
};

const registerPageTemplateData: PagePropsMap['signup'] = {
  title: 'Регистрация',
  form: {
    id: 'register-form',
    fields: [
      {
        id: 'email-input',
        name: 'email',
        inputType: 'email',
        label: 'Имя',
      },
      {
        id: 'login-input',
        name: 'login',
        inputType: 'text',
        label: 'Логин',
      },
      {
        id: 'first-name-input',
        name: 'first_name',
        inputType: 'text',
        label: 'Имя',
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
      },
      {
        id: 'password-input',
        name: 'password',
        inputType: 'password',
        label: 'Пароль',
      },
      {
        id: 'password-repeat-input',
        name: 'password_repeat',
        inputType: 'password',
        label: 'Пароль (еще раз)',
      },
    ],
    button: {
      id: 'button-login',
      text: 'Зарегистрироваться',
      type: 'submit',
    },
  },
  link: {
    text: 'Войти',
    to: 'login',
  },
};

export const appNavTemplateLinks: LinkProps[] = [
  {
    text: 'Авторизация',
    to: 'login',
  },
  {
    text: 'Регистрация',
    to: 'signup',
  },
];

export const templateData: Record<PageKey, PagePropsMap[PageKey]> = {
  login: loginPageTemplateData,
  signup: registerPageTemplateData,
};
