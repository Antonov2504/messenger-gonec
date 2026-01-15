import { routes } from '@/App.constants';
import { ToastService } from '@/services/toast';
import { router } from '@/shared/Router';

import { ApiError } from './ApiError';

export class ErrorHandler {
  static handle(error: unknown) {
    let message = 'Неизвестная ошибка';

    if (error instanceof ApiError) {
      message = error.reason;

      if (error.status === 401 && window.location.pathname !== routes.login) {
        router.go(routes.login);
      }
    }

    ToastService.error(message);
    console.error('[ErrorHandler]', error);
  }
}
