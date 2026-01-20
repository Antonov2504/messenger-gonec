import { EmptyContainer } from '@/modules/emptyContainer';
import { UsersList } from '@/modules/usersList';
import { Block } from '@/shared/Block';
import { deepEqual } from '@/shared/utils/deepEqual';
import { getEnding } from '@/shared/utils/string';

import './RemoveUserForm.scss';
import type {
  RemoveUserFormBlockProps,
  RemoveUserFormProps,
} from './RemoveUserForm.types';

export class RemoveUserForm extends Block<RemoveUserFormBlockProps> {
  private onRemoveUser: RemoveUserFormProps['onRemoveUser'];

  constructor({ chatUsers, activeChat, onRemoveUser }: RemoveUserFormProps) {
    super({
      isLoading: false,
      chatUsers,
      activeChat,
      usersList: chatUsers.length
        ? new UsersList({
            title: `${chatUsers.length} ${getEnding('участник', chatUsers.length, ['ов', '', 'а'])}`,
            users: chatUsers,
            action: 'remove',
            onAction: onRemoveUser,
            getStatus: (user) =>
              user.id === activeChat?.created_by ? 'Админ' : '',
          })
        : new EmptyContainer({ description: 'Пользователи не найдены' }),
    });

    this.onRemoveUser = onRemoveUser;
  }

  private _updateUsersList(props: RemoveUserFormBlockProps) {
    const chatUsers = props.chatUsers ?? [];

    const usersList = chatUsers.length
      ? new UsersList({
          title: `${chatUsers.length} ${getEnding('участник', chatUsers.length, ['ов', '', 'а'])}`,
          users: chatUsers,
          action: 'remove',
          onAction: this.onRemoveUser,
          getStatus: (user) =>
            user.id === props.activeChat?.created_by ? 'Админ' : '',
        })
      : new EmptyContainer({ description: 'Пользователи не найдены' });

    this.children.usersList = usersList;
  }

  componentDidMount(): void {
    this._updateUsersList(this.props);
  }

  componentDidUpdate(
    oldProps: RemoveUserFormBlockProps,
    newProps: RemoveUserFormBlockProps
  ): boolean {
    const chatUsersChanged = !deepEqual(oldProps.chatUsers, newProps.chatUsers);

    if (chatUsersChanged) {
      this._updateUsersList(newProps);
      return false;
    }

    return true;
  }

  render(): string {
    return `
      <div class="form-remove-user">
        {{{usersList}}}
      </div>
    `;
  }
}
