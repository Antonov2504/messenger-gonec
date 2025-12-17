import { PageFactory } from './PageFactory';
import { loginPageConfig, registerPageConfig } from './authPage';
import type { ChatsPageProps } from './chatsPage/ChatsPage.types';
import { ChatsPageMain } from './chatsPage/modules/main';
import { ChatsPageSidebar } from './chatsPage/modules/sidebar';
import { maintenancePageConfig, notFoundPageConfig } from './errorPage';
import { ProfilePage, type ProfilePageProps } from './profilePage';

export {
  ProfilePage,
  type ProfilePageProps,
  ChatsPageMain,
  ChatsPageSidebar,
  type ChatsPageProps,
  PageFactory,
  loginPageConfig,
  registerPageConfig,
  notFoundPageConfig,
  maintenancePageConfig,
};
