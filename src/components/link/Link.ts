import { Block } from '@/shared/Block';
import { router } from '@/shared/Router';

import type { LinkProps } from './Link.types';

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          router.go(this.props.to);
        },
      },
    });
  }

  protected render(): string {
    const { to } = this.props;
    return `<a href="${to}" class="{{className}}" data-page="${to}">{{text}}</a>`;
  }
}
