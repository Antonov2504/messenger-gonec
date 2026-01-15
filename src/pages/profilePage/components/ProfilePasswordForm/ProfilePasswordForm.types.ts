import type { Form } from '@/modules/form';
import type { Props as BlockProps } from '@/shared/Block';

export type ChangePasswordForm = {
  oldPassword: string;
  password: string;
  password_repeat: string;
};

export type ProfilePasswordFormProps = {
  onCancelChangePassword: () => void;
  onSubmitChangePassword: (values: Record<string, string>) => void;
};

export type ProfilePasswordFormBlockProps = BlockProps & {
  form: Form;
};
