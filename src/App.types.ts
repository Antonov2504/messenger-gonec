import type {
  AuthPageProps,
  ChatsPageProps,
  ErrorPageProps,
  ProfilePageProps,
} from '@pages/index';

export type PageErrorKey = 'notFound' | 'maintenance';
export type PageKey = 'login' | 'signup' | 'chats' | 'profile' | PageErrorKey;

export type PagePropsMap = {
  login: AuthPageProps;
  signup: AuthPageProps;
  notFound: ErrorPageProps;
  maintenance: ErrorPageProps;
  profile: ProfilePageProps;
  chats: ChatsPageProps;
};

export type PageConfig<P> = {
  layout: string;
  template: string;
  props: P;
  sidebar?: string;
};

export type Avatar = {
  isEmpty: boolean;
  isEditable: boolean;
  src: string;
  alt: string;
  name: string;
  size?: string;
  type?: 'column';
};

export type UserDto = {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type MessageDto = {
  user: UserDto;
  time: string;
  content: string;
};

export type ChatDto = {
  id: string;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: MessageDto;
};
