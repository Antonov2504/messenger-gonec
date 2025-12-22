import type { Button } from '@/components/button';
import type { Props as BlockProps } from '@/shared/Block';

export type OptionsControlProps = {
  onOpen: () => void;
};

export type OptionsControlBlockProps = BlockProps & {
  buttonOptions: Button;
};
