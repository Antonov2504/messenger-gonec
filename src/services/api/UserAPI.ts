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
}

export const userAPI = new UserAPI();
