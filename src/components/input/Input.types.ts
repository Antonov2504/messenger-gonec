import type { Props as BlockProps } from '@/shared/Block';

export type InputProps = {
  id: string;
  name: string;
  type?: HTMLInputElement['type'];
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  onInput?: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
};

export type InputBlockProps = BlockProps & InputProps;
