import { Button } from '@components/button';
import { Field } from '@components/field';
import { Image } from '@components/image';
import { Input } from '@components/input';
import { Link } from '@components/link';
import { TextArea } from '@components/textArea';
import '@helpers/handlebarsHelpers.ts';
import { AppFooter } from '@layout/appFooter';
import { PageLayout } from '@layout/page/index.js';
import { Avatar } from '@modules/avatar';
import { Chat } from '@modules/chat';
import { Form } from '@modules/form';
import { InfoField } from '@modules/infoField';
import Handlebars from 'handlebars';

import { appFooterTemplateLinks, pagesMap } from './App.constants';
import type { PageKey } from './App.types';

// Регистрируем партиции компонентов
Handlebars.registerPartial('Image', Image);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('TextArea', TextArea);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('InfoField', InfoField);
Handlebars.registerPartial('Form', Form);
Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('Chat', Chat);

// Регистрируем партиции layout
Handlebars.registerPartial('AppFooter', AppFooter);
Handlebars.registerPartial('PageLayout', PageLayout);

type AppState = {
  currentPage: PageKey;
};

export class App {
  private state: AppState;
  private readonly appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPage: 'login',
    };

    const appElement = document.querySelector('#app') as HTMLElement;

    if (!appElement) {
      throw new Error('not found DOM element with id app');
    }

    this.appElement = appElement;
  }

  htmlToNode(html: string): Node {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.cloneNode(true);
  }

  render() {
    const { layout, template, sidebar, props } =
      pagesMap[this.state.currentPage];

    const sidebarHtml = sidebar ? Handlebars.compile(sidebar)(props) : '';
    const pageHtml = Handlebars.compile(template)(props);

    const html = Handlebars.compile(layout)({
      content: pageHtml,
      sidebar: sidebarHtml,
      links: appFooterTemplateLinks,
    });

    this.appElement.replaceChildren(this.htmlToNode(html));

    this.attachEventListeners();
  }

  initAutoGrowTextArea() {
    const textarea = document.querySelector(
      '.autogrow'
    ) as HTMLTextAreaElement | null;

    if (!textarea) return;

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

  navigate(page: AppState['currentPage']) {
    if (page !== this.state.currentPage) {
      this.state.currentPage = page;
      this.render();
    }

    return;
  }
}
