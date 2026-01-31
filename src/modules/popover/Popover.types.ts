import type { Block, Props as BlockProps } from '@/shared/Block';

export type PopoverProps = {
  isOpened: boolean;
  content: (onClose: () => void) => Block;
  onClose: () => void;
};

export type PopoverBlockProps = BlockProps & {
  isOpened: boolean;
  content: Block | null;
  onClose: () => void;
};
