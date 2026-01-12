import { PageLayout } from '@/layout/page';

import type { BasePageConfig } from './PageFactory.types';

export class PageFactory {
  static create(configProps: BasePageConfig) {
    return new PageLayout(configProps);
  }
}
