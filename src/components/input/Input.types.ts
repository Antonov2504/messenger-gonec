import type { Props as BlockProps } from '@/shared/Block';

export type InputProps = BlockProps & {
  id: string;
  name: string;
  type?: HTMLInputElement['type'];
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  value?: string;
  required?: boolean;
};
