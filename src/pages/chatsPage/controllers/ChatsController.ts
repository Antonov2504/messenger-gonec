import type { ChatDto, MessageDto, UserDto, WSMessageDto } from '@/App.types';
import { chatsAPI } from '@/services/api/ChatsAPI';
import { ErrorHandler } from '@/services/api/ErrorHandler';
import { userAPI } from '@/services/api/UserAPI';
import { WSTransport, WSTransportEvents } from '@/services/api/WSTransport';
import { Store } from '@/services/store';
import { ToastService } from '@/services/toast';

import type { ChatsParams } from '../ChatsPage.types';
import type { AddChatFormModel } from '../models/AddChatFormModel';

export class ChatsController {
  private static _instance: ChatsController | null = null;
  private store = Store.getInstance();
  private wsTransport: WSTransport | null = null;
  private messagesOffset = 0;
  private hasMoreHistory = true;

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
      const sortedChats = this.sortChats(chats);

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
      this.setActiveChatLoading(true);

      const chatUsers = await chatsAPI.getChatUsers(id);
      this.store.setActiveChatUsers(chatUsers);

      this.setActiveChatLoading(false);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async getChatToken(id: number) {
    try {
      this.store.setMessages([]);
      this.setActiveChatLoading(true);

      const { token } = await chatsAPI.getChatToken(id);
      await this.connectToChat(id, token);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async connectToChat(chatId: number, token: string) {
    const userId = this.store.getState().user?.id;

    if (!userId) {
      return;
    }

    // Закрываем старое соединение
    this.disconnect();

    this.messagesOffset = 0;
    this.hasMoreHistory = true;

    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;

    this.wsTransport = new WSTransport(url);

    this.wsTransport.on(WSTransportEvents.Message, (message) => {
      this.handleMessage(message);
    });

    await this.wsTransport.connect();

    // Запрашиваем историю
    this.getOldMessages();
  }

  disconnect() {
    if (this.wsTransport) {
      this.wsTransport.close();
      this.wsTransport = null;
    }
  }

  getOldMessages() {
    if (!this.hasMoreHistory) {
      return;
    }

    this.wsTransport?.send({
      content: String(this.messagesOffset),
      type: 'get old',
    });
  }

  private handleMessage(data: WSMessageDto | WSMessageDto[]) {
    if (Array.isArray(data)) {
      // История сообщений
      if (data.length === 0) {
        this.hasMoreHistory = false;
        this.store.setActiveChatLoading(false);
        return;
      }

      this.messagesOffset += data.length;

      const prev = this.store.getState().messenger.messages;
      this.store.setMessages([...data.reverse(), ...prev]);
      this.store.setActiveChatLoading(false);
      return;
    }

    // Новое сообщение
    this.store.addMessage(data);

    const state = this.store.getState();
    const chats = state.messenger.chats.map((chat) => {
      if (chat.id === state.messenger.activeChat?.id) {
        const user = state.messenger.users.find(
          ({ id }) => id === data.user_id
        );

        if (!user) {
          return chat;
        }

        const newLastMessage: MessageDto = {
          user,
          time: data.time,
          content: data.content,
        };

        return { ...chat, last_message: newLastMessage, unread_count: 0 };
      }

      return chat;
    });

    // Сортируем по дате последнего сообщения
    const sortedChats = this.sortChats(chats);

    this.store.setChats(sortedChats);
  }

  sendMessage(message: string) {
    this.wsTransport?.send({
      content: message,
      type: 'message',
    });
  }

  sortChats(chats: ChatDto[]) {
    return chats.sort((a, b) => {
      const dateA = a.last_message?.time
        ? new Date(a.last_message.time).getTime()
        : 0;
      const dateB = b.last_message?.time
        ? new Date(b.last_message.time).getTime()
        : 0;
      return dateB - dateA;
    });
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
      this.setActiveChatLoading(true);
      await chatsAPI.removeChat({ chatId: chat.id });

      this.setActiveChat(null);
      this.store.setMessages([]);

      await this.getChats();
      this.setActiveChatLoading(false);
      ToastService.success(`Чат ${chat.title} успешно удален`);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}
