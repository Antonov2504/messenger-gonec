import type { Props as BlockProps } from '@/shared/Block';

export type ButtonProps = BlockProps & {
  id: string;
  text?: string;
  type?: HTMLButtonElement['type'];
  icon?: 'options' | 'clip' | 'arrow' | 'back';
  size?: 'm';
  color?: 'danger';
  variant?: 'primary' | 'secondary' | 'primary-icon' | 'icon';
  disabled?: boolean;
  onClick?: (e?: MouseEvent) => void;
};
