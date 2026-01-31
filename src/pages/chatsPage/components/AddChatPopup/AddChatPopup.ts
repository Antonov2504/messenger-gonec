import { Form } from '@/modules/form';
import { Popup } from '@/modules/popup';

import type { AddChatFormModel } from '../../models/AddChatFormModel';
import { addChatFormValidators } from './AddChatPopup.constants';

type AddChatPopupProps = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (values: AddChatFormModel) => void;
};

export class AddChatPopup extends Popup {
  constructor({ isOpened, onClose, onSubmit }: AddChatPopupProps) {
    super({
      isOpened,
      onClose,
      content: () =>
        new Form({
          id: 'form-add-chat',
          title: 'Название чата',
          fields: [
            {
              id: 'title-input',
              name: 'title',
              inputType: 'text',
              label: 'Название',
              required: true,
            },
          ],
          validators: addChatFormValidators,
          submitButton: {
            id: 'button-add-chat',
            text: 'Добавить',
            type: 'submit',
            fullWidth: true,
          },
          onSubmit: (values) => onSubmit(values as AddChatFormModel),
        }),
    });
  }
}
