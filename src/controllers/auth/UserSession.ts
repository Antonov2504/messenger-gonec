import type { UserDto } from '@/App.types';
import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';

export class UserSessionController {
  private static _instance: UserSessionController | null = null;

  user: UserDto | null = null;

  private constructor() {}

  static getInstance(): UserSessionController {
    if (!this._instance) {
      this._instance = new UserSessionController();
    }
    return this._instance;
  }

  async fetchUser() {
    try {
      this.user = await authAPI.getUser();
      return this.user;
    } catch (error) {
      ErrorHandler.handle(error);
      this.user = null;
    }
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
