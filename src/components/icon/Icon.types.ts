import type { Props } from '@/shared/Block';

export type IconBlockTypes = 'add' | 'cross' | 'trash';

export type IconBlockProps = Props & {
  type?: IconBlockTypes;
  color?: 'danger';
};
