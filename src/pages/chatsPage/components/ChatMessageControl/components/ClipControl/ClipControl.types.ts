import type { Button } from '@/components/button';
import type { Props as BlockProps } from '@/shared/Block';

export type ClipControlProps = {
  onClip: () => void;
};

export type ClipControlBlockProps = BlockProps & {
  clipButton: Button;
};
