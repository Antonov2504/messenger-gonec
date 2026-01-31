import { routes } from '@/App.constants';
import { ChatsController } from '@/pages/chatsPage/controllers/ChatsController';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { Store } from '@/services/store';
import { router } from '@/shared/Router';

export class UserLogoutController {
  private static instance: UserLogoutController;
  private store = Store.getInstance();
  private chatsController = ChatsController.getInstance();

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserLogoutController();
    }
    return this.instance;
  }

  async logout() {
    try {
      this.store.setLogoutLoading(true);
      this.chatsController.disconnect();
      await authAPI.logout();

      this.store.reset();
      router.go(routes.login);
    } catch (e) {
      ErrorHandler.handle(e);
    } finally {
      this.store.setLogoutLoading(false);
    }
  }
}
