import { authAPI } from '@/services/api/AuthAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { Store } from '@/services/store';

export class UserSessionController {
  private static _instance: UserSessionController | null = null;
  private store = Store.getInstance();

  private constructor() {}

  static getInstance(): UserSessionController {
    if (!this._instance) {
      this._instance = new UserSessionController();
    }
    return this._instance;
  }

  async fetchUser() {
    try {
      const user = await authAPI.getUser();
      this.store.setUser(user);

      return user;
    } catch (error) {
      ErrorHandler.handle(error);
      this.store.setUser(null);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.store.getState().user !== null;
  }
}
