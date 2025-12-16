import { Link } from '@/components/link';
import { Form } from '@/modules/form';
import { Block } from '@/shared/Block';

import { loginFormValidators } from './LoginPage.constants';

export class LoginPage extends Block {
  constructor() {
    super({
      title: 'Вход',
      form: new Form({
        id: 'login-form',
        fields: [
          {
            id: 'login-input',
            name: 'login',
            inputType: 'text',
            label: 'Логин',
            required: true,
          },
          {
            id: 'password-input',
            name: 'password',
            inputType: 'password',
            label: 'Пароль',
            required: true,
          },
        ],
        validators: loginFormValidators,
        submitButton: {
          id: 'button-login',
          text: 'Войти',
          type: 'submit',
        },
        onSubmit: (values) => console.log({ values }),
      }),
      link: new Link({
        text: 'Еще не зарегистрированы?',
        to: 'signup',
        className: 'link',
      }),
    });
  }

  render(): string {
    return `
      <section class="auth-page">
        <h1>{{title}}</h1>
        {{{form}}}
        {{{link}}}
      </section>
    `;
  }
}
