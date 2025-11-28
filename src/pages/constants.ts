import type { AuthLayoutProps } from '../layout/auth';
import type { ErrorLayoutProps } from '../layout/error';
import AuthPage from './authPage/AuthPage.hbs?raw';
import ErrorPage from './errorPage/ErrorPage.hbs?raw';

export type PageErrorKey = 'notFound' | 'maintenance';
export type PageKey = 'login' | 'signup' | PageErrorKey;

export const pagesMap: Record<PageKey, string> = {
  login: AuthPage,
  signup: AuthPage,
  notFound: ErrorPage,
  maintenance: ErrorPage,
};

export type PagePropsMap = {
  login: AuthLayoutProps;
  signup: AuthLayoutProps;
  notFound: ErrorLayoutProps;
  maintenance: ErrorLayoutProps;
};
