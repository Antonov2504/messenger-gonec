import { Block } from '@/shared/Block';

import type {
  ChatsPageMainBlockProps,
  ChatsPageMainProps,
} from './ChatsPage.types';
import './ChatsPageMain.scss';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessageControl } from './components/ChatMessageControl';

export class ChatsPageMain extends Block<ChatsPageMainBlockProps> {
  constructor({ header }: ChatsPageMainProps) {
    super({
      header: new ChatHeader({ header }),
      messageControl: new ChatMessageControl({
        onClip: () => console.log('clip attach'),
        onSend: (message: string) => console.log(message),
      }),
    });
  }

  protected render(): string {
    return `
      <section class="chats-page">
        {{{header}}}

        <article class="chats-page__feed">Выберите чат, чтобы отправить сообщение</article>
        
        {{{messageControl}}}
      </section>
    `;
  }
}
