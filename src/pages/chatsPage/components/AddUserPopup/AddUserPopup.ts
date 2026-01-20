import { Popup } from '@/modules/popup';

import { AddUserFormConnected } from '../AddUserForm/AddUserFormConnected';
import type { AddUserPopupProps } from './AddUserPopup.types';

export class AddUserPopup extends Popup {
  constructor(props: AddUserPopupProps) {
    super({
      ...props,
      content: () => new AddUserFormConnected({}),
    });
  }
}
