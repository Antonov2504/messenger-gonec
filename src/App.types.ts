export type PageErrorKey = 'not-found' | 'maintenance';
export type PageKey = 'login' | 'signup' | 'chats' | 'profile' | PageErrorKey;

export type Avatar = {
  isEmpty: boolean;
  isEditable: boolean;
  src: string;
  alt: string;
  name: string;
  size?: string;
  type?: 'column';
};

export type UserDto = {
  id: string;
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
  id: string;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: MessageDto;
};
