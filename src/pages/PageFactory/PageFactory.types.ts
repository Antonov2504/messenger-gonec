import type { Button } from '@/components/button';
import type { Block } from '@/shared/Block';

export type BasePageConfig = {
  content: Block;
  sidebar?: Block;
  sidebarType?: 'back';
  buttonBack?: Button;
};
