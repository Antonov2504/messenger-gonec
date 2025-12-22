import { Form } from '@/modules/form';
import { Block } from '@/shared/Block';

import { editProfileFormValidators } from '../../profile.page';
import type {
  ProfileInfoFormBlockProps,
  ProfileInfoFormProps,
} from './ProfileInfoForm.types';

export class ProfileInfoForm extends Block<ProfileInfoFormBlockProps> {
  constructor({
    info,
    onSubmitEditProfile,
    onCancelEditProfile,
  }: ProfileInfoFormProps) {
    super({
      form: new Form({
        id: 'profile-edit-form',
        fields: [
          {
            id: 'email-input',
            name: 'email',
            inputType: 'email',
            label: 'Почта',
            required: true,
            value: info.email,
            fieldType: 'wide',
          },
          {
            id: 'login-input',
            name: 'login',
            inputType: 'text',
            label: 'Логин',
            required: true,
            value: info.login,
            fieldType: 'wide',
          },
          {
            id: 'first-name-input',
            name: 'first_name',
            inputType: 'text',
            label: 'Имя',
            required: true,
            value: info.first_name,
            fieldType: 'wide',
          },
          {
            id: 'second-name-input',
            name: 'second_name',
            inputType: 'text',
            label: 'Фамилия',
            value: info.second_name,
            fieldType: 'wide',
          },
          {
            id: 'display-name-input',
            name: 'display_name',
            inputType: 'text',
            label: 'Имя в чате',
            value: info.display_name,
            fieldType: 'wide',
          },
          {
            id: 'phone-input',
            name: 'phone',
            inputType: 'text',
            label: 'Телефон',
            required: true,
            value: info.phone,
            fieldType: 'wide',
          },
        ],
        validators: editProfileFormValidators,
        submitButton: {
          id: 'button-submit-edit-profile',
          text: 'Сохранить',
          type: 'submit',
        },
        cancelButton: {
          id: 'button-cancel-edit-profile',
          text: 'Отменить',
          type: 'button',
          variant: 'outlined',
        },
        onSubmit: onSubmitEditProfile,
        onCancel: onCancelEditProfile,
      }),
    });
  }

  protected render(): string {
    return `<div class="profile-page__form">{{{form}}}</div>`;
  }
}
