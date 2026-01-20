import type { Block, Props as BlockProps } from '@/shared/Block';

import type { IconBlockTypes } from '../icon';

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
  iconType?: IconBlockTypes;
  onClick?: (e?: MouseEvent) => void;
};

export type ButtonBlockProps = BlockProps &
  ButtonProps & {
    iconBlock: Block;
  };
