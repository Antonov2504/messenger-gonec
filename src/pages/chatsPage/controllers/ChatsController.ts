import type { ChatDto, UserDto } from '@/App.types';
import { chatsAPI } from '@/services/api/ChatsAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { userAPI } from '@/services/api/UserAPI';
import { Store } from '@/services/store';
import { ToastService } from '@/services/toast';

import type { ChatsParams } from '../ChatsPage.types';
import type { AddChatFormModel } from '../models/AddChatFormModel';

export class ChatsController {
  private static _instance: ChatsController | null = null;
  private store = Store.getInstance();

  private constructor() {}

  static getInstance(): ChatsController {
    if (!this._instance) {
      this._instance = new ChatsController();
    }
    return this._instance;
  }

  async getChats(params?: ChatsParams) {
    try {
      const chats = await chatsAPI.getChats(params);
      const sortedChats = chats.sort();

      this.store.setChats(sortedChats);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async addChat(data: AddChatFormModel) {
    try {
      await chatsAPI.addChat(data);
      await this.getChats();
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateAvatar(chatId: number, file: File) {
    try {
      const formData = new FormData();
      formData.append('chatId', String(chatId));
      formData.append('avatar', file);

      const updatedChat = await chatsAPI.updateChatAvatar(formData);

      ToastService.success('Аватар чата успешно обновлен');
      this.setActiveChat(updatedChat);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async searchUsers(login: string) {
    try {
      const foundUsers = await userAPI.search({ login });

      this.store.setUsersToAdd(foundUsers);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getChatUsers(id: number) {
    try {
      const chatUsers = await chatsAPI.getChatUsers(id);
      this.store.setActiveChatUsers(chatUsers);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getChatToken(id: number) {
    try {
      const chatToken = await chatsAPI.getChatToken(id);
      this.store.setActiveChatToken(chatToken.token);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  resetUsersToAdd() {
    this.store.setUsersToAdd([]);
  }

  setActiveChat(activeChat: ChatDto | null) {
    this.store.setActiveChat(activeChat);
  }

  setActiveChatLoading(loading: boolean) {
    this.store.setActiveChatLoading(loading);
  }

  async addUser(chatId: number, user: UserDto) {
    try {
      await chatsAPI.addUser({ chatId, users: [user.id] });
      await this.getChatUsers(chatId);

      ToastService.success(`Пользователь ${user.login} успешно добавлен в чат`);
    } catch (error) {
      this.store.setUsersToAdd([]);
      ErrorHandler.handle(error);
    }
  }

  async removeUser(chatId: number, user: UserDto) {
    try {
      await chatsAPI.removeUser({ chatId, users: [user.id] });
      await this.getChatUsers(chatId);

      ToastService.success(`Пользователь ${user.login} успешно удален из чата`);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async removeChat(chat: ChatDto | null) {
    try {
      if (!chat) {
        return;
      }

      this.setActiveChat(null);
      await chatsAPI.removeChat({ chatId: chat.id });
      await this.getChats();

      ToastService.success(`Чат ${chat.title} успешно удален`);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
