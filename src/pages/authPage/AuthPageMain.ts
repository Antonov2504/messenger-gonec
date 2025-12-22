import { Block } from '@/shared/Block';

import './AuthPage.scss';
import type { AuthPageMainBlockProps } from './AuthPage.types';

export class AuthPageMain extends Block<AuthPageMainBlockProps> {
  render() {
    return `
      <section class="auth-page">
        <h1>{{title}}</h1>
        {{{form}}}
        {{{link}}}
      </section>
    `;
  }
}
