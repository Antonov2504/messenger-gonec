import type { Block, Props as BlockProps } from '@/shared/Block';

export type PopupProps = {
  isOpened: boolean;
  content: () => Block;
  onClose: () => void;
};

export type PopupBlockProps = BlockProps &
  Omit<PopupProps, 'content'> & {
    content: Block;
  };
