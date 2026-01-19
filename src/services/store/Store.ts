import type { ChatDto, UserDto } from '@/App.types';
import { EventBus } from '@/shared/EventBus';
import { deepClone } from '@/shared/utils/deepClone';

import { initialState } from './constants';
import type { AppState } from './types';

export const StoreEvents = {
  Updated: 'updated',
} as const;

export class Store extends EventBus {
  private state: AppState = deepClone(initialState);
  private static instance: Store;

  public getState(): AppState {
    return deepClone(this.state);
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
  }

  getProfilePageMode() {
    return this.state.settings.mode;
  }

  setChats(chats: ChatDto[]) {
    this.setState({
      messenger: {
        ...this.state.messenger,
        chats,
      },
    });
  }

  setActiveChat(activeChat: ChatDto | null) {
    this.setState({
      messenger: {
        ...this.state.messenger,
        activeChat,
      },
    });
  }

  setActiveChatUsers(users: UserDto[]) {
    this.setState({
      messenger: {
        ...this.state.messenger,
        users,
      },
    });
  }

  setUsersToAdd(usersToAdd: UserDto[]) {
    this.setState({
      messenger: {
        ...this.state.messenger,
        usersToAdd,
      },
    });
  }

  setActiveChatToken(token: string) {
    this.setState({
      messenger: {
        ...this.state.messenger,
        token,
      },
    });
  }

  setActiveChatLoading(loading: boolean) {
    this.setState({
      messenger: {
        ...this.state.messenger,
        activeChatLoading: loading,
      },
    });
  }

  reset() {
    this.state = deepClone(initialState);
    this.emit(StoreEvents.Updated);
  }
}
