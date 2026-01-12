import { routes } from '@/App.constants';
import { Link } from '@/components/link';
import { Block } from '@/shared/Block';

import './ErrorPage.scss';
import type {
  ErrorPageMainBlockProps,
  ErrorPageMainProps,
} from './ErrorPage.types';

export class ErrorPageMain extends Block<ErrorPageMainBlockProps> {
  constructor(props: ErrorPageMainProps) {
    super({
      ...props,
      link: new Link({
        text: 'Назад к чатам',
        to: routes.chats,
        className: 'link',
      }),
    });
  }

  render() {
    return `
      <article class="error-page">
        <p class="error-page__code">{{code}}</p>
        <p class="error-page__description">{{description}}</p>

        {{{link}}}
      </article>
    `;
  }
}
