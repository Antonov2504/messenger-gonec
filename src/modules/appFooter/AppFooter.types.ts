import type { Link, LinkProps } from '@/components/link';
import type { Props as BlockProps } from '@/shared/Block';

export type AppFooterProps = BlockProps & {
  links: LinkProps[];
};

export type AppFooterBlockProps = BlockProps & {
  links: Link[];
};
