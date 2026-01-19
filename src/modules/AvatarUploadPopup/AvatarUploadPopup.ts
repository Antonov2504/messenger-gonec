import { Popup } from '@/modules/popup';

import { AvatarUploadForm } from '../AvatarUploadForm';

type AvatarUploadPopupProps = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
};

export class AvatarUploadPopup extends Popup {
  constructor({ isOpened, onClose, onSubmit }: AvatarUploadPopupProps) {
    super({
      isOpened,
      onClose,
      content: () => new AvatarUploadForm({ onSubmit }),
    });
  }
}
