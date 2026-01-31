import { Block } from '@/shared/Block';

import './EmptyContainer.scss';
import type { EmptyContainerBlockProps } from './EmptyContainer.types';

export class EmptyContainer extends Block<EmptyContainerBlockProps> {
  render(): string {
    return `
      <div class="empty-container">
        ${this.props.description}
      </div>
    `;
  }
}
