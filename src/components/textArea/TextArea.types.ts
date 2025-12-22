import type { Props as BlockProps } from '@/shared/Block';

export type TextAreaProps = {
  id: string;
  name: string;
  type?: HTMLTextAreaElement['type'];
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  cols?: number;
  rows?: number;
  maxRows?: number;
  value?: string;
  ariaLabel?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onInput?: (name: string, value: string) => void;
  onEnter?: () => void;
};

export type TextAreaBlockProps = BlockProps & TextAreaProps;
