import type { UserDto } from '@/App.types';
import type { ChangePasswordFormModel } from '@/pages/profilePage/models/ChangePasswordFormModel';
import type { EditProfileFormModel } from '@/pages/profilePage/models/EditProfileFormModel';

import { HTTPTransport } from './HTTPTransport';
import { baseURL } from './constants';

export class UserAPI {
  private transport = new HTTPTransport();
  private baseUrl = `${baseURL}/user`;

  updateUserData(data: EditProfileFormModel) {
    return this.transport.put<UserDto>(`${this.baseUrl}/profile`, {
      data,
    });
  }

  changePassword(data: ChangePasswordFormModel) {
    return this.transport.put(`${this.baseUrl}/password`, { data });
  }

  updateUserAvatar(data: FormData) {
    return this.transport.put<UserDto>(`${this.baseUrl}/profile/avatar`, {
      data,
    });
  }

  search(data: { login: string }) {
    return this.transport.post<UserDto[]>(`${this.baseUrl}/search`, { data });
  }
}

export const userAPI = new UserAPI();
