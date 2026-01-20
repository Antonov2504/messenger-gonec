import { publicRoutes, routes } from '@/App.constants';
import type { RoutePath } from '@/App.types';
import { UserSessionController } from '@/pages/authPage/controllers/UserSession';

import type { Block } from '../Block';
import { Route } from './Route';

export class Router {
  routes: Route[] = [];
  history = window.history;
  sessionController = UserSessionController.getInstance();

  static __instance: Router | null = null;
  private _currentRoute: Route | null = null;
  private _rootQuery = '';
  private _hasFetchedUser = false;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, getBlock: () => Block, authRequired?: boolean) {
    const route = new Route(pathname, getBlock, {
      rootQuery: this._rootQuery,
      authRequired: !!authRequired,
    });
    this.routes.push(route);
    return this;
  }

  async start() {
    window.onpopstate = async () => {
      this._onRoute(window.location.pathname);
    };

    if (!this._hasFetchedUser) {
      this._hasFetchedUser = true;
      await this.sessionController.fetchUser();
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      const notFoundRoute = this.getRoute('*');
      if (!notFoundRoute) {
        return;
      }

      this._currentRoute?.leave();
      this._currentRoute = notFoundRoute;
      notFoundRoute.render();
      return;
    }

    const isLoggedIn = this.sessionController.isLoggedIn();

    if (route.config.authRequired && !isLoggedIn) {
      this.go(routes.login);
      return;
    }

    if (
      publicRoutes.includes(pathname as (typeof publicRoutes)[number]) &&
      isLoggedIn
    ) {
      this.go(routes.chats);
      return;
    }

    this._currentRoute?.leave();
    this._currentRoute = route;
    route.render();
  }

  go(pathname: RoutePath) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
