import type { Button } from '@/components/button';
import { AppFooter } from '@/modules/appFooter';
import type { Block, Props as BlockProps } from '@/shared/Block';

export type PageLayoutProps = BlockProps & {
  content: Block;
  sidebar?: Block;
  sidebarType?: 'back';
  buttonBack?: Button;
  appFooter?: AppFooter;
};
