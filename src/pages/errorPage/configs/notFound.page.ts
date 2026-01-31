import type { BasePageConfig } from '@/pages/PageFactory';

import { ErrorPageMain } from '../ErrorPageMain';

export const notFoundPageConfig: BasePageConfig = {
  content: () =>
    new ErrorPageMain({
      code: '404',
      description: 'Кто ищет, тот всегда найдет',
    }),
};
