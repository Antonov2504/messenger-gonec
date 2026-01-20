import type { Props as BlockProps } from '@/shared/Block';

export type ToastType = 'success' | 'error' | 'info';

export type ToastProps = {
  message: string;
  type: ToastType;
};

export type ToastBlockProps = BlockProps & ToastProps;
