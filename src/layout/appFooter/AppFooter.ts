import { Link } from '@/components/link';
import { Block } from '@/shared/Block';

import type { AppFooterBlockProps, AppFooterProps } from './AppFooter.types';

export class AppFooter extends Block<AppFooterBlockProps> {
  constructor({ links }: AppFooterProps) {
    super({
      links: links.map((link) => new Link(link)),
    });
  }

  protected render(): string {
    return `
      <nav class="app-footer">
        <ul class="app-footer__list">
          {{{links}}}
        </ul>
      </nav>
    `;
  }
}
