import type { Link } from '@/components/link';
import type { Props as BlockProps } from '@/shared/Block';

export type ErrorPageMainProps = {
  code: string;
  description: string;
};

export type ErrorPageMainBlockProps = BlockProps & {
  code: string;
  description: string;
  link: Link;
};
