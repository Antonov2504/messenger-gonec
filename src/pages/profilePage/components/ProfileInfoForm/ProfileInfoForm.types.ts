import type { UserDto } from '@/App.types';
import type { Form } from '@/modules/form';
import type { Props as BlockProps } from '@/shared/Block';

export type ProfileInfoFormProps = {
  info: UserDto;
  onSubmitEditProfile: (values: Record<string, string>) => void;
  onCancelEditProfile: () => void;
};

export type ProfileInfoFormBlockProps = BlockProps & {
  form: Form;
};
