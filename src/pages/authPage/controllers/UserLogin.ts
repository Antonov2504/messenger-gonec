import { routes } from '@/App.constants';
import type { LoginFormModel } from '@/pages/authPage/models/LoginFormModel';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { router } from '@/shared/Router';

import { UserSessionController } from './UserSession';

const sessionController = UserSessionController.getInstance();

export class UserLoginController {
  private _onLoadingChange?: (value: boolean) => void;
  private _onSuccess?: () => void;

  constructor(
    _onLoadingChange: (value: boolean) => void,
    onSuccess?: () => void
  ) {
    this._onLoadingChange = _onLoadingChange;
    this._onSuccess = onSuccess;
  }

  private setLoading(value: boolean) {
    this._onLoadingChange?.(value);
  }

  async login(data: LoginFormModel) {
    try {
      this.setLoading(true);
      await authAPI.signin(data);
      const user = await sessionController.fetchUser();

      if (!user) return;

      this._onSuccess?.();
      router.go(routes.chats);
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      this.setLoading(false);
    }
  }
}
