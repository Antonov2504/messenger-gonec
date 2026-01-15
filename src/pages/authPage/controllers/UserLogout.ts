import { routes } from '@/App.constants';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { Store } from '@/services/store';
import { router } from '@/shared/Router';

export class UserLogoutController {
  private static instance: UserLogoutController;
  private store = Store.getInstance();

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserLogoutController();
    }
    return this.instance;
  }

  async logout() {
    try {
      this.store.setLogoutLoading(true);
      await authAPI.logout();

      this.store.setUser(null);
      router.go(routes.login);
    } catch (e) {
      ErrorHandler.handle(e);
    } finally {
      this.store.setLogoutLoading(false);
    }
  }
}
