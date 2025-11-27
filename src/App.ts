import Handlebars from 'handlebars';

import { appNavTemplateLinks, templateData } from './App.constants';
import { Button } from './components/button';
import { Field } from './components/field';
import { Input } from './components/input';
import { Link } from './components/link';
import './helpers/handlebarsHelpers.js';
import { AppNavLayout } from './layout/appNav';
import { AuthLayout } from './layout/auth';
import { Form } from './modules/form';
import Pages, { type PageKey } from './pages';

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('Form', Form);
Handlebars.registerPartial('AuthLayout', AuthLayout);
Handlebars.registerPartial('AppNavLayout', AppNavLayout);

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
    this.initRouting();
  }

  htmlToNode(html: string): Node {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.cloneNode(true);
  }

  initRouting() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const page = target.getAttribute('data-page') as PageKey | null;

      if (target.tagName === 'A' && page && Pages[page]) {
        event.stopPropagation();
        event.preventDefault();

        this.navigate(page as PageKey);
      }
    });
  }

  render() {
    const hbsTemplate = Pages[this.state.currentPage];
    const hbsData = templateData[this.state.currentPage];
    const pageHtml = Handlebars.compile(hbsTemplate)(hbsData);

    const htmlWithNav = Handlebars.compile(
      '{{> AppNavLayout links=links content=content }}'
    )({
      links: appNavTemplateLinks,
      content: pageHtml,
    });

    this.appElement.replaceChildren(this.htmlToNode(htmlWithNav));

    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === 'login') {
      const loginButton = document.getElementById('button-login');

      loginButton?.addEventListener('click', () => console.log('auth'));
    }
  }

  navigate(page: AppState['currentPage']) {
    if (page !== this.state.currentPage) {
      this.state.currentPage = page;
      this.render();
    }

    return;
  }
}
