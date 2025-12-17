import { Block } from '@/shared/Block';

import type { PageLayoutProps } from './PageLayout.types';

export class PageLayout extends Block<PageLayoutProps> {
  constructor(props: PageLayoutProps) {
    super(props);
  }

  protected render(): string {
    const { sidebar, sidebarType } = this.props;

    const pageLayoutClassName = [
      'page-layout',
      sidebar && ` page-layout_format_sidebar`,
    ]
      .filter(Boolean)
      .join(' ');

    const mainClassName = [
      'page-layout__content',
      sidebar && ' page-layout__content_format_sidebar',
    ]
      .filter(Boolean)
      .join(' ');

    // {{> Button id="page-layout-button-back" type="button" variant="primary-icon" icon="back" }}
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
          ${sidebar ? `<aside class="page-layout__sidebar">${renderSidebar()}</aside>` : ''}

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
