import { PageLayout } from '@/layout/page';
import { AppFooter } from '@/modules/appFooter';

import type { BasePageConfig } from './PageFactory.types';

export class PageFactory {
  static create({ footer, ...configProps }: BasePageConfig) {
    return new PageLayout({
      ...configProps,
      appFooter: footer ? new AppFooter(footer) : undefined,
    });
  }
}
