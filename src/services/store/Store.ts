import { EventBus } from '@/shared/EventBus';

import { initialState } from './constants';
import type { AppState } from './types';

export const StoreEvents = {
  Updated: 'updated',
};

export class Store extends EventBus {
  private state: AppState = initialState;
  private static instance: Store;

  public getState(): AppState {
    return { ...this.state };
  }

  public setState(newState: Partial<AppState>) {
    this.state = { ...this.state, ...newState };
    this.emit(StoreEvents.Updated);
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  setLogoutLoading(value: boolean) {
    this.setState({
      settings: {
        ...this.state.settings,
        isLoadingLogout: value,
      },
    });
  }

  setUser(value: AppState['user']) {
    this.setState({
      user: value,
    });
  }

  setProfilePageMode(mode: AppState['settings']['mode']) {
    this.setState({
      settings: {
        ...this.state.settings,
        mode,
      },
    });
    this.emit(StoreEvents.Updated);
  }

  getProfilePageMode() {
    return this.state.settings.mode;
  }
}
