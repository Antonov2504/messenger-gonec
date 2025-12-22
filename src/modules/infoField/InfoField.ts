import { Block } from '@/shared/Block';

import './InfoField.scss';
import type { InfoFieldBlockProps } from './InfoField.types';

export class InfoField extends Block<InfoFieldBlockProps> {
  protected render(): string {
    return `
      <li class="info-field">
        <p class="info-field__label">{{label}}</p>
        <p class="info-field__value">{{value}}</p>
      </li>
    `;
  }
}
