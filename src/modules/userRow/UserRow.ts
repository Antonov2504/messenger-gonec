import { Button } from '@/components/button';
import { Block } from '@/shared/Block';
import { getAvatarUrl } from '@/shared/utils/string';

import { Avatar } from '../avatar';
import './UserRow.scss';
import type { UserRowBlockProps, UserRowProps } from './UserRow.types';

export class UserRow extends Block<UserRowBlockProps> {
  constructor({ user, action, status, onAction }: UserRowProps) {
    const { login, avatar } = user;

    super({
      action,
      status,
      avatar: new Avatar({
        size: 'm',
        src: avatar ? getAvatarUrl(avatar) : '',
        alt: avatar ? 'Аватар' : '',
        name: login ?? '',
        isEmpty: !avatar,
        isEditable: false,
      }),
      addButton: new Button({
        id: 'button-popover-add-user',
        text: 'Добавить',
        variant: 'secondary',
        onClick: () => onAction?.(user),
      }),
      removeButton: new Button({
        id: 'button-popover-remove-user',
        text: 'Удалить',
        variant: 'secondary',
        color: 'danger',
        onClick: () => onAction?.(user),
      }),
    });
  }

  render(): string {
    const { action, status } = this.props;

    const renderActionButton = () => {
      if (action === 'add') {
        return '{{{addButton}}}';
      }

      if (action === 'remove') {
        return '{{{removeButton}}}';
      }

      return '';
    };

    return `
      <div class="user-row">
        {{{avatar}}}
        ${status ? '<div class="user-row__status">{{{status}}}</div>' : ''}
        ${renderActionButton()}
      </div>
    `;
  }
}
