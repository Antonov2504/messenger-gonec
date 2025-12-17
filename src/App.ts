import type { PageKey } from './App.types';
import { PageFactory, loginPageConfig } from './pages';
import { registerPageConfig } from './pages/authPage/configs/register.page';
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
    this.attachEventListeners();
    this.render();
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
      case 'signup':
        return PageFactory.create(registerPageConfig);
      case 'login':
      default:
        return PageFactory.create(loginPageConfig);
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
      const link = target.closest('a');

      if (!link) {
        return;
      }

      const page = link.dataset.page as PageKey | undefined;

      if (!page) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      this.navigate(page);
    });

    this.initAutoGrowTextArea();
  }

  navigate(page: AppState['currentPageKey']) {
    if (page === this.state.currentPageKey) {
      return;
    }

    this.state.currentPage.dispatchComponentWillUnmount();

    this.state.currentPageKey = page;
    this.state.currentPage = this.createPage(page);

    this.render();
  }
}
