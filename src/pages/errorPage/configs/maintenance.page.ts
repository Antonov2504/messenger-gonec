import type { BasePageConfig } from '@/pages/PageFactory';

import { ErrorPageMain } from '../ErrorPageMain';

export const maintenancePageConfig: BasePageConfig = {
  content: new ErrorPageMain({
    code: '500',
    description: 'Что-то пошло не так...',
  }),
};
