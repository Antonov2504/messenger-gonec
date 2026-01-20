import { Toast, type ToastType } from '@/components/toast';

class ToastServiceClass {
  private container: HTMLElement;

  constructor() {
    let container = document.querySelector('.toast-container') as HTMLElement;

    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    this.container = container;
  }

  private show(message: string, type: ToastType) {
    const toast = new Toast({ message, type });
    const element = toast.getContent();

    if (!element) {
      return;
    }

    this.container.appendChild(element);
    toast.dispatchComponentDidMount();

    setTimeout(() => {
      toast.dispatchComponentWillUnmount();
      element.remove();
    }, 3000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }
}

export const ToastService = new ToastServiceClass();
