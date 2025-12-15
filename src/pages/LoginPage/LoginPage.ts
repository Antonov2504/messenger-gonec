import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Block } from '@/shared/Block';

export class LoginPage extends Block {
  constructor() {
    super({
      id: 'form-login-id',
      title: 'Вход',
      input: new Input({
        id: 'login-input',
        name: 'login',
        type: 'text',
      }),
      button: new Button({
        id: 'login',
        type: 'submit',
        text: 'Войти',
        onClick: () => console.log('click!!!'),
      }),
    });
  }

  render(): string {
    return `
      <section class="auth-page">
        <h1>{{title}}</h1>
        <form id="{{id}}" action="#" class="form" autocomplete="off">
          <fieldset class="form__fieldset">
            {{{input}}}
          </fieldset>

          <div class="form__actions">
            {{{button}}}
          </div>
        </form>
      </section>
    `;
  }
}
