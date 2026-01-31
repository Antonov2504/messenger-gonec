import type { routes } from './App.constants';

export type RouteKey = keyof typeof routes;
export type RoutePath = (typeof routes)[RouteKey];

export type UserDto = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type MessageDto = {
  user: UserDto;
  time: string;
  content: string;
};

export type ChatDto = {
  id: number;
  created_by: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: MessageDto | null;
};

export type TokenDto = {
  token: string;
};

export type WSMessageDto = {
  id: number;
  chat_id: number;
  type: 'message';
  content: string;
  is_read: boolean;
  time: string;
  user_id: number;
};
