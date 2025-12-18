import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import type { PageLayoutProps } from './PageLayout.types';

export class PageLayout extends Block<PageLayoutProps> {
  protected render(): string {
    const { sidebarType } = this.props;
    const { sidebar } = this.children;

    const hasSidebar = !!(sidebar || sidebarType);

    const pageLayoutClassName = getClassName([
      'page-layout',
      hasSidebar && 'page-layout_format_sidebar',
    ]);

    const mainClassName = getClassName([
      'page-layout__content',
      hasSidebar && 'page-layout__content_format_sidebar',
    ]);

    const renderSidebar = () => {
      if (sidebarType === 'back') {
        return `
          <div class="page-layout__common-sidebar">
            {{{buttonBack}}}
          </div>
        `;
      }

      return `{{{sidebar}}}`;
    };

    return `
      <div class="page-root">
        <div class="${pageLayoutClassName}">
          ${hasSidebar ? `<aside class="page-layout__sidebar">${renderSidebar()}</aside>` : ''}

          <main class="${mainClassName}">
            {{{content}}}
          </main>
        </div>

        <footer>
          {{{appFooter}}}
        </footer>
      </div>
    `;
  }
}
