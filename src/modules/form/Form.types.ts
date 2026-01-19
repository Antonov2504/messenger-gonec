import type { Validator } from '@/modules/formController';
import type { Props as BlockProps } from '@/shared/Block';
import type { Button, ButtonProps } from '@components/button';
import type { Field, FieldProps } from '@components/field';

export type FormProps = {
  id: string;
  fields: FieldProps[];
  submitButton: ButtonProps;
  title?: string;
  cancelButton?: ButtonProps;
  validators?: Record<string, Validator[]>;
  onSubmit?: (values: Record<string, string>) => void;
  onCancel?: () => void;
};

export type FormBlockProps = BlockProps & {
  id: FormProps['id'];
  fields: Field[];
  submitButton: Button;
  title?: string;
  cancelButton?: Button;
  onSubmit?: FormProps['onSubmit'];
};
