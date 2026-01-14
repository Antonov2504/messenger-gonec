import type { Form } from '@/modules/form';
import type { Props as BlockProps } from '@/shared/Block';

import type { ChangePasswordFormModel } from '../../models/ChangePasswordFormModel';

export type ProfilePasswordFormProps = {
  onCancelChangePassword: () => void;
  onSubmitChangePassword: (values: ChangePasswordFormModel) => void;
};

export type ProfilePasswordFormBlockProps = BlockProps & {
  form: Form;
};
