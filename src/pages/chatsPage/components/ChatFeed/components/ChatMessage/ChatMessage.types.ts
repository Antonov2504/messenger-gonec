import type { WSMessageDto } from '@/App.types';
import type { Avatar } from '@/modules/avatar';
import type { Props } from '@/shared/Block';

export type ChatMessageProps = {
  message: WSMessageDto;
  avatar: string;
  isActive: boolean;
};

export type ChatMessageBlockProps = Props & {
  message: WSMessageDto;
  avatarBlock: Avatar;
  isActive: boolean;
};
