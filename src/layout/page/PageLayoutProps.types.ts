import type { ButtonProps } from '@/components/button';
import type { Block, Props as BlockProps } from '@/shared/Block';

import type { AppFooterProps } from '../appFooter/AppFooter.types';

export type PageLayoutProps = BlockProps & {
  appFooter: AppFooterProps;
  content: Block;
  sidebar?: Block;
  sidebarType?: 'back';
  buttonBack?: ButtonProps;
};
