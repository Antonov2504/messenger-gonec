import { Button } from '@/components/button';
import { Block } from '@/shared/Block';

import type {
  ProfileActionsBlockProps,
  ProfileActionsProps,
} from './ProfileActions.types';

export class ProfileActions extends Block<ProfileActionsBlockProps> {
  constructor({
    isLoadingLogout,
    onEdit,
    onChangePassword,
    onLogout,
  }: ProfileActionsProps) {
    super({
      buttonEdit: new Button({
        id: 'profile-edit-button',
        text: 'Редактировать',
        variant: 'secondary',
        onClick: onEdit,
      }),
      buttonChangePassword: new Button({
        id: 'profile-password-edit-button',
        text: 'Изменить пароль',
        variant: 'secondary',
        onClick: onChangePassword,
      }),
      buttonLogout: new Button({
        id: 'profile-logout-button',
        text: 'Выйти',
        variant: 'secondary',
        color: 'danger',
        loading: isLoadingLogout,
        onClick: onLogout,
      }),
    });
  }

  get buttonLogout(): Button {
    return this.children.buttonLogout as Button;
  }

  protected render(): string {
    return `
      <ul class="profile-page__actions">
        <li class="profile-page__action">
          {{{buttonEdit}}}
        </li>
        <li class="profile-page__action">
          {{{buttonChangePassword}}}
        </li>
        <li class="profile-page__action">
          {{{buttonLogout}}}
        </li>
      </ul>
    `;
  }
}
