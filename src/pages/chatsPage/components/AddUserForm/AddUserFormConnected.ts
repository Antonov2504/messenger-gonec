import type { UserDto } from '@/App.types';
import { Store, connect } from '@/services/store';
import type { AppState } from '@/services/store/types';

import { ChatsController } from '../../controllers/ChatsController';
import { AddUserForm } from './AddUserForm';

const chatsController = ChatsController.getInstance();

export const AddUserFormConnected = connect(AddUserForm, (state: AppState) => {
  return {
    usersToAdd: state.messenger.usersToAdd ?? [],
    chatUsers: state.messenger.users ?? [],
    onSearch: (login: string) => chatsController.searchUsers(login),
    onAddUser: (user: UserDto) => {
      const chatId = Store.getInstance().getState().messenger.activeChat?.id;
      if (!chatId) {
        return;
      }

      chatsController.addUser(chatId, user);
    },
  };
});
