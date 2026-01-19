import { routes } from '@/App.constants';
import type { ChatDto } from '@/App.types';
import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { Link } from '@/components/link';
import { Chat } from '@/modules/chat';
import { Block } from '@/shared/Block';
import { debounce } from '@/shared/utils/debounce';
import { deepEqual } from '@/shared/utils/deepEqual';

import type {
  ChatsPageSidebarBlockProps,
  ChatsPageSidebarProps,
} from './ChatsPage.types';
import './ChatsPageSidebar.scss';
import { AddChatPopup } from './components/AddChatPopup';
import { ChatsController } from './controllers/ChatsController';
import type { AddChatFormModel } from './models/AddChatFormModel';

export class ChatsPageSidebar extends Block<ChatsPageSidebarBlockProps> {
  chatsController = ChatsController.getInstance();
  private isAddChatPopupOpened = false;

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
        onInput: debounce((_, value: string) => this._handleSearch(value), 300),
      }),
      chats: sidebar.chats.map(
        (chat) =>
          new Chat({
            ...chat,
            isActive: sidebar.activeChat?.id === chat.id,
            onClick: () => this._handleClickChat(chat),
          })
      ),
      addChatButton: new Button({
        id: 'add-chat-button',
        text: 'Добавить чат',
        variant: 'secondary',
        iconType: 'add',
        onClick: () => this._openAddChatPopup(),
      }),
      addChatPopup: new AddChatPopup({
        isOpened: false,
        onClose: () => this._closeAddChatPopup(),
        onSubmit: (values) => this._addChat(values),
      }),
      sidebar,
    });
  }

  private _handleSearch(query: string) {
    this.chatsController.getChats(
      query ? { title: query, offset: 0, limit: 10 } : undefined
    );
  }

  private _openAddChatPopup() {
    this.isAddChatPopupOpened = true;
    this._updatePopup();
  }

  private _closeAddChatPopup() {
    this.isAddChatPopupOpened = false;
    this._updatePopup();
  }

  private _updatePopup() {
    const popup = this.children.addChatPopup as AddChatPopup;
    popup.setProps({
      isOpened: this.isAddChatPopupOpened,
    });
  }

  private async _addChat(values: AddChatFormModel) {
    await this.chatsController.addChat(values);
    this._closeAddChatPopup();
  }

  async _handleClickChat(activeChat: ChatDto) {
    if (activeChat.id === this.props.sidebar.activeChat?.id) {
      return;
    }

    this.chatsController.setActiveChat(activeChat);
    this.chatsController.setActiveChatLoading(true);

    await this.chatsController.getChatUsers(activeChat.id);
    await this.chatsController.getChatToken(activeChat.id);
  }

  componentDidMount(): void {
    this.chatsController.getChats();
  }

  componentDidUpdate(
    oldProps: ChatsPageSidebarBlockProps,
    newProps: ChatsPageSidebarBlockProps
  ) {
    const oldActiveChat = oldProps.sidebar.activeChat;
    const newActiveChat = newProps.sidebar.activeChat;

    const chatsChanged = !deepEqual(
      oldProps.sidebar.chats,
      newProps.sidebar.chats
    );
    const activeChatChanged = oldActiveChat?.id !== newActiveChat?.id;

    const activeChatAvatarChanged =
      oldActiveChat?.avatar !== newActiveChat?.avatar;

    if (chatsChanged) {
      this.children.chats = newProps.sidebar.chats.map(
        (chat) =>
          new Chat({
            ...chat,
            isActive: newActiveChat?.id === chat.id,
            onClick: () => this._handleClickChat(chat),
          })
      );

      return true;
    }

    if (activeChatChanged) {
      const oldActiveId = oldActiveChat?.id;
      const newActiveId = newActiveChat?.id;

      const chats = this.children.chats as Chat[];

      const oldChat = chats.find(({ props }) => props.id === oldActiveId);
      const newChat = chats.find(({ props }) => props.id === newActiveId);

      oldChat?.setProps({ isActive: false });
      newChat?.setProps({ isActive: true });

      return false;
    }

    if (activeChatAvatarChanged) {
      const chats = this.children.chats as Chat[];
      const activeChat = chats.find(
        ({ props }) => props.id === newActiveChat?.id
      );

      if (activeChat) {
        activeChat.updateAvatar(newActiveChat?.avatar ?? '');
      }

      return false;
    }

    return false;
  }

  render(): string {
    const chats = this.children.chats as Chat[];

    const renderChats = () => {
      if (!chats.length) {
        return '<div class="chats-page__chats-stub">Здесь появятся чаты...</div>';
      }

      return '{{{chats}}}';
    };

    return `
    <section class="chats-page__sidebar">
      {{{link}}}
      {{{addChatButton}}}
      {{{search}}}

      <ul class="chats-page__chats">
        ${renderChats()}
      </ul>

      {{{addChatPopup}}}
    </section>
    `;
  }
}
