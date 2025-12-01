import type { ButtonProps } from '@components/button';
import type { FieldProps } from '@components/field';

export type FormProps = {
  id: string;
  fields: FieldProps[];
  button: ButtonProps;
};
