import { Block } from '@/shared/Block';

import './Toast.scss';
import type { ToastBlockProps } from './Toast.types';

export class Toast extends Block<ToastBlockProps> {
  render() {
    return `
      <div class="toast toast_${this.props.type}">
        ${this.props.message}
      </div>
    `;
  }
}
