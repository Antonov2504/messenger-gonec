import type { Props as BlockProps } from '@/shared/Block';

export type ImageProps = {
  src: string;
  alt: string;
};

export type ImageBlockProps = BlockProps & ImageProps;
