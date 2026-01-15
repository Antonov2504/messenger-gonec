import type { UserDto } from '@/App.types';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { userAPI } from '@/services/api/UserAPI';
import { Store } from '@/services/store';
import { ToastService } from '@/services/toast';

import type { PageMode } from '../ProfilePage.types';
import type { ChangePasswordFormModel } from '../models/ChangePasswordFormModel';
import type { EditProfileFormModel } from '../models/EditProfileFormModel';

export class UserProfileController {
  private static _instance: UserProfileController | null = null;
  private store = Store.getInstance();

  user: UserDto | null = null;

  private constructor() {}

  static getInstance(): UserProfileController {
    if (!this._instance) {
      this._instance = new UserProfileController();
    }
    return this._instance;
  }

  async updateProfile(values: EditProfileFormModel) {
    try {
      const updatedUser = await userAPI.updateUserData(values);
      ToastService.success('Данные пользователя успешно обновлены');

      this.store.setUser(updatedUser);
      this.changeMode('view');
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async changePassword(values: ChangePasswordFormModel) {
    try {
      await userAPI.changePassword(values);
      ToastService.success('Пароль успешно обновлен');

      this.changeMode('view');
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  changeMode(mode: PageMode) {
    this.store.setProfilePageMode(mode);
  }

  cancelEdit() {
    this.store.setProfilePageMode('view');
  }
}
