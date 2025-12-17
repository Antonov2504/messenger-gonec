import type { Block, Props as BlockProps } from '@/shared/Block';

export type AuthPageMainBlockProps = BlockProps & {
  title: string;
  form: Block;
  link: Block;
};
