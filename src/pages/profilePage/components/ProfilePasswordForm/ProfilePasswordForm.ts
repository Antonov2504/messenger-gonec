import { Form } from '@/modules/form';
import { Block } from '@/shared/Block';

import { changePasswordFormValidators } from '../../profile.page';
import type {
  ProfilePasswordFormBlockProps,
  ProfilePasswordFormProps,
} from './ProfilePasswordForm.types';

export class ProfilePasswordForm extends Block<ProfilePasswordFormBlockProps> {
  constructor({
    onSubmitChangePassword,
    onCancelChangePassword,
  }: ProfilePasswordFormProps) {
    super({
      form: new Form({
        id: 'profile-password-form',
        fields: [
          {
            id: 'old-password-input',
            name: 'oldPassword',
            inputType: 'password',
            label: 'Старый пароль',
            required: true,
            fieldType: 'wide',
          },
          {
            id: 'new-password-input',
            name: 'password',
            inputType: 'password',
            label: 'Новый пароль',
            required: true,
            fieldType: 'wide',
          },
          {
            id: 'new-password-repeat-input',
            name: 'password_repeat',
            inputType: 'password',
            label: 'Повторите новый пароль',
            required: true,
            fieldType: 'wide',
          },
        ],
        validators: changePasswordFormValidators,
        submitButton: {
          id: 'button-submit-change-password',
          text: 'Сохранить',
          type: 'submit',
        },
        cancelButton: {
          id: 'button-cancel-change-password',
          text: 'Отменить',
          type: 'button',
          variant: 'outlined',
        },
        onSubmit: onSubmitChangePassword,
        onCancel: onCancelChangePassword,
      }),
    });
  }
  protected render(): string {
    return `<div class="profile-page__form">{{{form}}}</div>`;
  }
}
