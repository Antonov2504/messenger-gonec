import type { UserDto } from '@/App.types';
import type { Form } from '@/modules/form';
import type { Props as BlockProps } from '@/shared/Block';

import type { EditProfileFormModel } from '../../models/EditProfileFormModel';

export type ProfileInfoFormProps = {
  info: UserDto;
  onSubmitEditProfile: (values: EditProfileFormModel) => void;
  onCancelEditProfile: () => void;
};

export type ProfileInfoFormBlockProps = BlockProps & {
  form: Form;
};
