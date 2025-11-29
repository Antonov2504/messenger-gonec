import type {
  AuthPageProps,
  ErrorPageProps,
  ProfilePageProps,
} from '@pages/index';

export type PageErrorKey = 'notFound' | 'maintenance';
export type PageKey = 'login' | 'signup' | 'profile' | PageErrorKey;

export type PagePropsMap = {
  login: AuthPageProps;
  signup: AuthPageProps;
  notFound: ErrorPageProps;
  maintenance: ErrorPageProps;
  profile: ProfilePageProps;
};

export type PageConfig<P> = {
  layout: string;
  template: string;
  props: P;
  sidebar?: string;
};

export type UserInfoDto = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  login_chat: string;
  phone: string;
};
