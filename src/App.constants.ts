import type { LinkProps } from '@components/link';
import { PageLayout } from '@layout/page';
import {
  AuthPage,
  ChatsPageMain,
  ChatsPageSidebar,
  ErrorPage,
  type ErrorPageProps,
  ProfilePage,
} from '@pages/index';

import type {
  PageConfig,
  PageErrorKey,
  PageKey,
  PagePropsMap,
} from './App.types';
import AvatarVladimir from './assets/images/avatar-1.jpg';
import Avatar2 from './assets/images/avatar-2.jpg';
import AvatarAlex from './assets/images/avatar.jpg';

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
    submitButton: {
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
    submitButton: {
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

const profilePageTemplateData: PagePropsMap['profile'] = {
  avatar: {
    isEmpty: false,
    isEditable: true,
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
    phone: '+7 (090) 606 17 99',
  },
};

const chatsPageTemplateData: PagePropsMap['chats'] = {
  header: {
    avatar: {
      isEmpty: false,
      isEditable: true,
      src: Avatar2,
      alt: 'Личность профиля',
      name: 'Недвижимость',
    },
  },
  feed: {
    isEmpty: true,
  },
  sidebar: {
    activeChatId: '2',
    chats: [
      {
        id: '1',
        title: 'Владимир',
        avatar: AvatarVladimir,
        unread_count: 1,
        last_message: {
          user: {
            id: '1',
            avatar: AvatarVladimir,
            email: 'vladimir@yandex.ru',
            login: 'vladimir',
            first_name: 'Владимир',
            second_name: 'Шестаков',
            display_name: 'Vldmr',
            phone: '+7 (999) 123 10 77',
          },
          time: '11:28',
          content:
            'Привет! Я тебе вчера звонил, хотел сообщить, что пора сдавать работу, Новый Год на носу! Мы уже нарядили, украсили ёлку, закупили подарки, ждем с нетерпением!',
        },
      },
      {
        id: '2',
        title: 'Недвижимость',
        avatar: Avatar2,
        unread_count: 3,
        last_message: {
          user: {
            id: '777',
            avatar: Avatar2,
            email: 'arenda@yandex.ru',
            login: 'rieltor',
            first_name: 'Руслан',
            second_name: 'Андропов',
            display_name: 'Nedviga',
            phone: '+7 (909) 357 11 73',
          },
          time: '21:25',
          content:
            'Продам гараж. В отличном состоянии. Есть кессон, там можно хранить картошку.',
        },
      },
    ],
  },
};

const errorPageTemplateData: Record<PageErrorKey, ErrorPageProps> = {
  notFound: {
    code: '404',
    description: 'Кто ищет, тот всегда найдет',
  },
  maintenance: {
    code: '500',
    description: 'Что-то пошло не так...',
  },
};

export const appFooterTemplateLinks: LinkProps[] = [
  {
    text: 'Авторизация',
    to: 'login',
  },
  {
    text: 'Регистрация',
    to: 'signup',
  },
  {
    text: 'Чаты',
    to: 'chats',
  },
  {
    text: 'Профиль',
    to: 'profile',
  },
  {
    text: '404',
    to: 'notFound',
  },
  {
    text: '500',
    to: 'maintenance',
  },
];

export const pagesMap: { [K in PageKey]: PageConfig<PagePropsMap[K]> } = {
  login: {
    template: AuthPage,
    layout: PageLayout,
    props: loginPageTemplateData,
  },
  signup: {
    template: AuthPage,
    layout: PageLayout,
    props: registerPageTemplateData,
  },
  notFound: {
    template: ErrorPage,
    layout: PageLayout,
    props: errorPageTemplateData.notFound,
  },
  maintenance: {
    template: ErrorPage,
    layout: PageLayout,
    props: errorPageTemplateData.maintenance,
  },
  profile: {
    template: ProfilePage,
    layout: PageLayout,
    sidebar: 'true',
    props: profilePageTemplateData,
  },
  chats: {
    template: ChatsPageMain,
    layout: PageLayout,
    sidebar: ChatsPageSidebar,
    props: chatsPageTemplateData,
  },
};
