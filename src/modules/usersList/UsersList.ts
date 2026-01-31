import { Block } from '@/shared/Block';

import { UserRow } from '../userRow';
import './UsersList.scss';
import type { UsersListBlockProps, UsersListProps } from './UsersList.types';

export class UsersList extends Block<UsersListBlockProps> {
  constructor({ title, users, action, onAction, getStatus }: UsersListProps) {
    super({
      title,
      rows: users.map((user) => {
        const status = getStatus?.(user);
        return new UserRow({
          user,
          action: status ? undefined : action,
          status,
          onAction,
        });
      }),
    });
  }

  render(): string {
    const { title } = this.props;

    return `
      <div class="users-list">
        ${title ? `<h3 class="users-list__title">${title}</h3>` : ''}
        <div class="users-list__items">
          {{{rows}}}
        </div>
      </div>
    `;
  }
}
