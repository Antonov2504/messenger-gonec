import { routes } from '@/App.constants';
import type { RegisterFormModel } from '@/pages/authPage/models/RegisterFormModel';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { router } from '@/shared/Router';

import { UserSessionController } from './UserSession';

const sessionController = UserSessionController.getInstance();

export class UserRegisterController {
  private _onLoadingChange?: (value: boolean) => void;
  private _onSuccess?: () => void;

  constructor(
    onLoadingChange: (value: boolean) => void,
    onSuccess?: () => void
  ) {
    this._onLoadingChange = onLoadingChange;
    this._onSuccess = onSuccess;
  }

  private setLoading(value: boolean) {
    this._onLoadingChange?.(value);
  }

  async register(data: RegisterFormModel) {
    try {
      this.setLoading(true);
      await authAPI.signup(data);
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
