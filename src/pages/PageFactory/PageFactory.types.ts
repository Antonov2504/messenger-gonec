import type { ButtonProps } from '@/components/button';
import type { AppFooterProps } from '@/modules/appFooter';
import type { Block } from '@/shared/Block';

export type BasePageConfig = {
  content: Block;
  sidebar?: Block;
  sidebarType?: 'back';
  buttonBack?: ButtonProps;
  footer?: AppFooterProps;
};
