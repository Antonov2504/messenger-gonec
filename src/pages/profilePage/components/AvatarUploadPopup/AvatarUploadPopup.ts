import { Popup } from '@/modules/popup';

import { AvatarUploadForm } from '../AvatarUploadForm';

interface AvatarUploadPopupProps {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

export class AvatarUploadPopup extends Popup {
  constructor({ isOpened, onClose, onSubmit }: AvatarUploadPopupProps) {
    super({
      isOpened: isOpened,
      onClose: onClose,
      content: new AvatarUploadForm({
        onSubmit: onSubmit,
      }),
    });
  }
}
