import type { Image } from '@/components/image';
import type { Props as BlockProps } from '@/shared/Block';

export type AvatarProps = {
  isEmpty: boolean;
  isEditable: boolean;
  src: string;
  alt: string;
  name: string;
  size?: string;
  type?: 'column';
};

export type AvatarBlockProps = BlockProps & {
  isEmpty: boolean;
  isEditable: boolean;
  image: Image;
  name: string;
  size?: string;
  type?: 'column';
};
