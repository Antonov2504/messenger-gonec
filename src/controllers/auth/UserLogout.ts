import { routes } from '@/App.constants';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { router } from '@/shared/Router';

export class UserLogoutController {
  private _onLoadingChange?: (value: boolean) => void;

  constructor(onLoadingChange?: (value: boolean) => void) {
    this._onLoadingChange = onLoadingChange;
  }

  private setLoading(value: boolean) {
    this._onLoadingChange?.(value);
  }

  async logout() {
    try {
      this.setLoading(true);
      await authAPI.logout();

      // TODO: удалить user из стора

      router.go(routes.login);
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      this.setLoading(false);
    }
  }
}
