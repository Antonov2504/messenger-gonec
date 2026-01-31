import { Popup } from '@/modules/popup';

import { RemoveUserFormConnected } from '../RemoveUserForm/RemoveUserFormConnected';
import type { RemoveUserPopupProps } from './RemoveUserPopup.types';

export class RemoveUserPopup extends Popup {
  constructor(props: RemoveUserPopupProps) {
    super({
      ...props,
      content: () => new RemoveUserFormConnected({}),
    });
  }
}
