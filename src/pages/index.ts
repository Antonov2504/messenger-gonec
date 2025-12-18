import { PageFactory } from './PageFactory';
import { loginPageConfig, registerPageConfig } from './authPage';
import type { ChatsPageProps } from './chatsPage/ChatsPage.types';
import { ChatsPageMain } from './chatsPage/modules/main';
import { ChatsPageSidebar } from './chatsPage/modules/sidebar';
import { maintenancePageConfig, notFoundPageConfig } from './errorPage';
import { profilePageConfig } from './profilePage';

export {
  ChatsPageMain,
  ChatsPageSidebar,
  type ChatsPageProps,
  PageFactory,
  profilePageConfig,
  loginPageConfig,
  registerPageConfig,
  notFoundPageConfig,
  maintenancePageConfig,
};
