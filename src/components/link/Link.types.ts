import type { RoutePath } from '@/App.types';
import type { Props as BlockProps } from '@/shared/Block';

export type LinkProps = BlockProps & {
  text: string;
  to: RoutePath;
  className?: string;
};
