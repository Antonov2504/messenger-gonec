import type { PageKey } from '@/App.types';
import type { Props as BlockProps } from '@/shared/Block';

export type LinkProps = BlockProps & {
  text: string;
  to: PageKey;
  className?: string;
};
