import type { UserDto } from '@/App.types';
import type { LoginFormModel } from '@/pages/authPage/models/LoginFormModel';
import type { RegisterFormModel } from '@/pages/authPage/models/RegisterFormModel';

import { HTTPTransport } from './HTTPTransport';
import { baseURL } from './constants';

export class AuthAPI {
  private transport = new HTTPTransport();
  private baseUrl = `${baseURL}/auth`;

  signin(data: LoginFormModel) {
    return this.transport.post(`${this.baseUrl}/signin`, {
      data,
    });
  }

  signup(data: RegisterFormModel) {
    return this.transport.post(`${this.baseUrl}/signup`, { data });
  }

  getUser() {
    return this.transport.get<UserDto>(`${this.baseUrl}/user`);
  }

  logout() {
    return this.transport.post(`${this.baseUrl}/logout`);
  }
}

export const authAPI = new AuthAPI();
