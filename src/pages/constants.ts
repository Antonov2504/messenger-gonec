import type { AuthLayoutProps } from '../layout/auth';
import LoginPage from './loginPage/LoginPage.hbs?raw';
import RegisterPage from './registerPage/RegisterPage.hbs?raw';

export type PageKey = 'login' | 'signup';

export const pagesMap: Record<PageKey, string> = {
  login: LoginPage,
  signup: RegisterPage,
};

export type PagePropsMap = {
  login: AuthLayoutProps;
  signup: AuthLayoutProps;
};
