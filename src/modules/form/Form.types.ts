import type { Validator } from '@/modules/formController';
import type { Props as BlockProps } from '@/shared/Block';
import type { Button, ButtonProps } from '@components/button';
import type { Field, FieldProps } from '@components/field';

export type FormProps = {
  id: string;
  fields: FieldProps[];
  submitButton: ButtonProps;
  onSubmit?: (values: Record<string, string>) => void;
  validators?: Record<string, Validator[]>;
};

export type FormBlockProps = BlockProps & {
  id: FormProps['id'];
  fields: Field[];
  submitButton: Button;
  onSubmit?: FormProps['onSubmit'];
};
