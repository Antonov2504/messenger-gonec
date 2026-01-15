import AvatarVladimir from '@assets/images/avatar-1.jpg';
import Avatar2 from '@assets/images/avatar-2.jpg';

import type {
  ChatsPageMainProps,
  ChatsPageSidebarProps,
} from './pages/chatsPage/ChatsPage.types';

export const chatsPageTemplateData: ChatsPageMainProps & ChatsPageSidebarProps =
  {
    header: {
      avatar: {
        isEmpty: false,
        isEditable: false,
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

export const routes = {
  login: '/',
  signup: '/sign-up',
  profile: '/settings',
  chats: '/messenger',
  maintenance: '/maintenance',
  notFound: '*',
} as const;

export const publicRoutes = [routes.login, routes.signup, routes.maintenance];
