import type { ChatDto, TokenDto, UserDto } from '@/App.types';
import type {
  AddUserRequest,
  ChatsParams,
  GetChatUsersParams,
} from '@/pages/chatsPage/ChatsPage.types';
import type { AddChatFormModel } from '@/pages/chatsPage/models/AddChatFormModel';

import { HTTPTransport } from './HTTPTransport';
import { baseURL } from './constants';

export class ChatsAPI {
  private transport = new HTTPTransport();
  private baseUrl = `${baseURL}/chats`;

  getChats(params?: ChatsParams) {
    return this.transport.get<ChatDto[]>(`${this.baseUrl}`, {
      data: params,
    });
  }

  addChat(data: AddChatFormModel) {
    return this.transport.post(`${this.baseUrl}`, { data });
  }

  addUser(data: AddUserRequest) {
    return this.transport.put(`${this.baseUrl}/users`, {
      data,
    });
  }

  removeUser(data: AddUserRequest) {
    return this.transport.delete(`${this.baseUrl}/users`, {
      data,
    });
  }

  removeChat(data: { chatId: number }) {
    return this.transport.delete(`${this.baseUrl}`, {
      data,
    });
  }

  updateChatAvatar(data: FormData) {
    return this.transport.put<ChatDto>(`${this.baseUrl}/avatar`, {
      data,
    });
  }

  getChatUsers(id: number, params?: GetChatUsersParams) {
    return this.transport.get<UserDto[]>(`${this.baseUrl}/${id}/users`, {
      data: params,
    });
  }

  getChatToken(id: number) {
    return this.transport.post<TokenDto>(`${this.baseUrl}/token/${id}`);
  }
}

export const chatsAPI = new ChatsAPI();
