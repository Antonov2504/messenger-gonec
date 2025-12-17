import { PageFactory } from './PageFactory';
import { loginPageConfig } from './authPage';
import type { ChatsPageProps } from './chatsPage/ChatsPage.types';
import { ChatsPageMain } from './chatsPage/modules/main';
import { ChatsPageSidebar } from './chatsPage/modules/sidebar';
import { ErrorPage, type ErrorPageProps } from './errorPage';
import { ProfilePage, type ProfilePageProps } from './profilePage';

export {
  ErrorPage,
  type ErrorPageProps,
  ProfilePage,
  type ProfilePageProps,
  ChatsPageMain,
  ChatsPageSidebar,
  type ChatsPageProps,
  PageFactory,
  loginPageConfig,
};
