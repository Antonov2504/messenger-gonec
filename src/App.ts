import { createButton } from './components/button';

type AppState = {
  currentPage: string;
};

export class App {
  private state: AppState;
  private readonly appElement: HTMLElement;

  constructor() {
    this.state = {
      currentPage: 'main',
    };
    const appElement = document.querySelector('#app') as HTMLElement;

    if (!appElement) {
      throw new Error('no DOM element with id app');
    }

    this.appElement = appElement;
  }

  render() {
    this.appElement.textContent = `render content: ${this.state.currentPage}`;

    const button = createButton('Авторизоваться', () => {
      console.log('click!');
    });

    this.appElement.append(button);
  }
}
