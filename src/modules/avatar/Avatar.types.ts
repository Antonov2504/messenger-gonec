import type { Image } from '@/components/image';
import type { Props as BlockProps } from '@/shared/Block';

export type AvatarProps = {
  src: string;
  alt: string;
  name?: string;
  size?: 's' | 'm' | 'l';
  type?: 'column';
  isEmpty?: boolean;
  isEditable?: boolean;
  onClick?: (e?: MouseEvent) => void;
};

export type AvatarBlockProps = BlockProps & {
  image: Image;
  name?: string;
  size?: string;
  type?: 'column';
  isEmpty?: boolean;
  isEditable?: boolean;
};
