import '@helpers/handlebarsHelpers.ts';

import { pagesMap } from './App.constants';
import type { PageKey } from './App.types';
import { LoginPage } from './pages/LoginPage';
import type { Block } from './shared/Block';

type AppState = {
  currentPageKey: PageKey;
  currentPage: Block;
};

export class App {
  private state: AppState;
  private readonly appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPageKey: 'login',
      currentPage: this.createPage('login'),
    };

    const appElement = document.querySelector('#app') as HTMLElement;

    if (!appElement) {
      throw new Error('not found DOM element with id app');
    }

    this.appElement = appElement;
    this.render();
  }

  htmlToNode(html: string): Node {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.cloneNode(true);
  }

  render() {
    const pageElement = this.state.currentPage.getContent();

    if (pageElement) {
      this.appElement.replaceChildren(pageElement);
      this.state.currentPage.dispatchComponentDidMount();
    }
  }

  createPage(pageKey: PageKey) {
    switch (pageKey) {
      case 'login':
        return new LoginPage();
      default:
        return new LoginPage();
      // case 'signup':
      // case 'chats':
      // case 'profile':
      // case 'notFound':
      // case 'maintenance':
    }
  }

  initAutoGrowTextArea() {
    const textarea = document.querySelector(
      '.autogrow'
    ) as HTMLTextAreaElement | null;

    if (!textarea) {
      return;
    }

    const maxRows = 5;
    const lineHeight = 1.25 * 16;
    const maxHeight = maxRows * lineHeight + 20;

    const autoGrow = () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    };

    autoGrow();
    textarea.addEventListener('input', autoGrow);
  }

  attachEventListeners() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const page = target.dataset.page as PageKey | null;

      if (target.tagName === 'A' && page && pagesMap[page]) {
        event.stopPropagation();
        event.preventDefault();

        this.navigate(page as PageKey);
      }
    });

    this.initAutoGrowTextArea();
  }

  navigate(page: AppState['currentPageKey']) {
    if (page !== this.state.currentPageKey) {
      this.state.currentPageKey = page;
      this.render();
    }

    return;
  }
}
