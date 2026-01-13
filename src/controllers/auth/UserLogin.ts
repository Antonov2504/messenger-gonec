import { routes } from '@/App.constants';
import type { LoginFormModel } from '@/models/LoginFormModel';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { router } from '@/shared/Router';

import { UserSessionController } from './UserSession';

const sessionController = UserSessionController.getInstance();

export class UserLoginController {
  private _onLoadingChange?: (value: boolean) => void;

  constructor(_onLoadingChange: (value: boolean) => void) {
    this._onLoadingChange = _onLoadingChange;
  }

  private setLoading(value: boolean) {
    this._onLoadingChange?.(value);
  }

  async login(data: LoginFormModel) {
    try {
      this.setLoading(true);
      await authAPI.signin(data);
      const user = await sessionController.fetchUser();

      // TODO: записать в стор
      console.log({ user });

      router.go(routes.chats);
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      this.setLoading(false);
    }
  }
}
