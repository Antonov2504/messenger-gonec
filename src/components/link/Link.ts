import { Block } from '@/shared/Block';

import type { LinkProps } from './Link.types';

export class Link extends Block<LinkProps> {
  protected render(): string {
    return `<a href="/{{to}}" class="{{className}}" data-page="{{to}}">{{text}}</a>`;
  }
}
