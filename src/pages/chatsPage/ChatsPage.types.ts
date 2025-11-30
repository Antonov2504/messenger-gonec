import type { Avatar, ChatDto } from '@/App.types';

export type ChatsPageProps = {
  header: {
    avatar: Avatar;
  };
  feed: {
    isEmpty: boolean;
  };
  sidebar: {
    activeChatId: string;
    chats: ChatDto[];
  };
};
