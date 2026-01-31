import { EmptyContainer } from '@/modules/emptyContainer';
import { Form } from '@/modules/form';
import { UsersList } from '@/modules/usersList';
import { Block } from '@/shared/Block';
import { deepEqual } from '@/shared/utils/deepEqual';

import { addUserFormValidators } from './AddUserForm.constants';
import './AddUserForm.scss';
import type {
  AddUserFormBlockProps,
  AddUserFormProps,
} from './AddUserForm.types';

export class AddUserForm extends Block<AddUserFormBlockProps> {
  private onSearch: AddUserFormProps['onSearch'];
  private onAddUser: AddUserFormProps['onAddUser'];

  constructor({
    usersToAdd,
    chatUsers,
    onSearch,
    onAddUser,
  }: AddUserFormProps) {
    super({
      isLoading: false,
      usersToAdd,
      chatUsers,
      form: new Form({
        id: 'form-add-user-to-chat',
        title: 'Добавить пользователя',
        fields: [
          {
            id: 'login-input',
            name: 'login',
            inputType: 'text',
            label: 'Логин пользователя',
            required: true,
          },
        ],
        validators: addUserFormValidators,
        submitButton: {
          id: 'button-search-user',
          text: 'Найти',
          type: 'submit',
          fullWidth: true,
        },
        onSubmit: (values) => {
          this.handleSearch(values.login);
        },
      }),
      usersList: new EmptyContainer({ description: 'Пользователи не найдены' }),
    });

    this.onSearch = onSearch;
    this.onAddUser = onAddUser;
  }

  private async handleSearch(login: string) {
    this.setProps({ isLoading: true });

    try {
      await this.onSearch(login);
    } finally {
      this.setProps({ isLoading: false });
    }
  }

  private _updateUsersList(props: AddUserFormBlockProps) {
    const usersToAdd = props.usersToAdd ?? [];
    const chatUsers = props.chatUsers ?? [];

    const chatUserIds = chatUsers.map(({ id }) => id);

    this.children.usersList = usersToAdd.length
      ? new UsersList({
          title: 'Найденные пользователи',
          users: usersToAdd,
          action: 'add',
          onAction: this.onAddUser,
          getStatus: (user) =>
            chatUserIds.includes(user.id) ? 'Добавлен' : '',
        })
      : new EmptyContainer({ description: 'Пользователи не найдены' });
  }

  componentDidUpdate(
    oldProps: AddUserFormBlockProps,
    newProps: AddUserFormBlockProps
  ): boolean {
    const usersToAddChanged = !deepEqual(
      oldProps.usersToAdd,
      newProps.usersToAdd
    );
    const chatUsersChanged = !deepEqual(oldProps.chatUsers, newProps.chatUsers);

    if (usersToAddChanged || chatUsersChanged) {
      this._updateUsersList(newProps);
      return false;
    }

    return true;
  }

  render(): string {
    return `
      <div class="form-add-user">
        {{{form}}}

        ${this.props.isLoading ? '<div class="loader">Поиск...</div>' : ''}

        {{{usersList}}}
      </div>
    `;
  }
}
