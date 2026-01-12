import { routes } from '@/App.constants';
import { Field } from '@/components/field';
import { Link } from '@/components/link';
import { Chat } from '@/modules/chat';
import { Block } from '@/shared/Block';

import type {
  ChatsPageSidebarBlockProps,
  ChatsPageSidebarProps,
} from './ChatsPage.types';
import './ChatsPageSidebar.scss';

export class ChatsPageSidebar extends Block<ChatsPageSidebarBlockProps> {
  constructor({ sidebar }: ChatsPageSidebarProps) {
    super({
      link: new Link({
        className: 'link link_type_chevron chats-page__link',
        to: routes.profile,
        text: 'Профиль',
      }),
      search: new Field({
        id: 'chats-page-search',
        inputType: 'text',
        fieldType: 'search',
        name: 'search',
        placeholder: 'Поиск',
        maxlength: 100,
      }),
      chats: sidebar.chats.map((chat) => new Chat(chat)),
    });
  }

  protected render(): string {
    return `
    <section class="chats-page__sidebar">
      {{{link}}}
      {{{search}}}

      <ul class="chats-page__chats">
        {{{chats}}}
      </ul>
    </section>
    `;
  }
}
