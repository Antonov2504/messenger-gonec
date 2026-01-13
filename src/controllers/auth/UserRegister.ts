import { routes } from '@/App.constants';
import type { RegisterFormModel } from '@/models/RegisterFormModel';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { router } from '@/shared/Router';

import { UserSessionController } from './UserSession';

const sessionController = UserSessionController.getInstance();

export class UserRegisterController {
  private _onLoadingChange?: (value: boolean) => void;

  constructor(onLoadingChange: (value: boolean) => void) {
    this._onLoadingChange = onLoadingChange;
  }

  private setLoading(value: boolean) {
    this._onLoadingChange?.(value);
  }

  async register(data: RegisterFormModel) {
    try {
      this.setLoading(true);
      await authAPI.signup(data);
      await sessionController.fetchUser();
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
