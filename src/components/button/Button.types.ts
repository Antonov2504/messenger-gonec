import type { Props as BlockProps } from '@/shared/Block';

export type ButtonProps = {
  id: string;
  text?: string;
  type?: HTMLButtonElement['type'];
  icon?: 'options' | 'clip' | 'arrow' | 'back';
  size?: 'm';
  color?: 'danger';
  variant?: 'primary' | 'secondary' | 'outlined' | 'primary-icon' | 'icon';
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (e?: MouseEvent) => void;
};

export type ButtonBlockProps = BlockProps & ButtonProps;
