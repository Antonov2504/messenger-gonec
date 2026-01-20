import { routes } from './App.constants';
import {
  PageFactory,
  chatsPageConfig,
  loginPageConfig,
  maintenancePageConfig,
  notFoundPageConfig,
  profilePageConfig,
  registerPageConfig,
} from './pages';
import { router } from './shared/Router';

export class App {
  constructor() {
    const appElement = document.querySelector('#app') as HTMLElement;

    if (!appElement) {
      throw new Error('not found DOM element with id app');
    }

    this.initRoutes();
    router.start();
  }

  initRoutes() {
    router
      .use(
        routes.login,
        () => PageFactory.create(loginPageConfig),
        loginPageConfig.authRequired
      )
      .use(
        routes.signup,
        () => PageFactory.create(registerPageConfig),
        registerPageConfig.authRequired
      )
      .use(
        routes.profile,
        () => PageFactory.create(profilePageConfig),
        profilePageConfig.authRequired
      )
      .use(
        routes.chats,
        () => PageFactory.create(chatsPageConfig),
        chatsPageConfig.authRequired
      )
      .use(
        routes.maintenance,
        () => PageFactory.create(maintenancePageConfig),
        maintenancePageConfig.authRequired
      )
      .use(
        '*',
        () => PageFactory.create(notFoundPageConfig),
        notFoundPageConfig.authRequired
      );
  }
}
