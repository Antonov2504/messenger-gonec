import type { UserDto } from '@/App.types';
import { Store, connect } from '@/services/store';
import type { AppState } from '@/services/store/types';

import { ChatsController } from '../../controllers/ChatsController';
import { RemoveUserForm } from './RemoveUserForm';

const chatsController = ChatsController.getInstance();

export const RemoveUserFormConnected = connect(
  RemoveUserForm,
  (state: AppState) => {
    return {
      chatUsers: state.messenger.users ?? [],
      activeChat: state.messenger.activeChat,
      onRemoveUser: (user: UserDto) => {
        const chatId = Store.getInstance().getState().messenger.activeChat?.id;
        if (!chatId) {
          return;
        }

        chatsController.removeUser(chatId, user);
      },
    };
  }
);
