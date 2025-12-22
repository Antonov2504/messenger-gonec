import type { Props as BlockProps } from '@/shared/Block';

import type { Input } from '../input';

export type FieldProps = {
  id: string;
  name: string;
  inputType?: HTMLInputElement['type'];
  label?: string;
  value?: string;
  fieldType?: 'wide' | 'search';
  required?: boolean;
  error?: string;
  placeholder?: string;
  maxlength?: number;
  onInput?: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
};

export type FieldBlockProps = BlockProps & {
  input: Input;
  fieldType?: FieldProps['fieldType'];
  label?: string;
  className?: string;
  required?: boolean;
  error?: string;
};

export type GetClassName = {
  fieldType?: FieldProps['fieldType'];
  error?: FieldProps['error'];
};
