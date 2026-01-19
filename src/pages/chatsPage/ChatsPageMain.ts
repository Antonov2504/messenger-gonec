import { AvatarUploadPopup } from '@/modules/AvatarUploadPopup';
import { Block } from '@/shared/Block';
import { getAvatarUrl } from '@/shared/utils/string';

import type {
  ChatPopups,
  ChatsPageMainBlockProps,
  ChatsPageMainProps,
} from './ChatsPage.types';
import './ChatsPageMain.scss';
import { AddUserPopup } from './components/AddUserPopup';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessageControl } from './components/ChatMessageControl';
import { RemoveUserPopup } from './components/RemoveUserPopup';
import { ChatsController } from './controllers/ChatsController';

export class ChatsPageMain extends Block<ChatsPageMainBlockProps> {
  private chatsController = ChatsController.getInstance();
  private activePopup: ChatPopups = null;

  constructor({ activeChat }: ChatsPageMainProps) {
    super({
      header: ChatsPageMain.createChatHeader(activeChat, {
        onUploadAvatar: () => this._openPopup('uploadAvatar'),
        onAddUser: () => this._openPopup('addUser'),
        onRemoveUser: () => this._openPopup('removeUser'),
        onRemoveChat: () => this.chatsController.removeChat(activeChat),
      }),
      messageControl: new ChatMessageControl({
        onClip: () => console.log('clip attach'),
        onSend: (message: string) => console.log(message),
      }),
      activeChat,
      avatarPopup: new AvatarUploadPopup({
        isOpened: false,
        onClose: () => this._closePopup(),
        onSubmit: (file) => this._uploadAvatar(file),
      }),
      addUserPopup: new AddUserPopup({
        isOpened: false,
        onClose: () => {
          this._closePopup();
          this.chatsController.resetUsersToAdd();
        },
      }),
      removeUserPopup: new RemoveUserPopup({
        isOpened: false,
        onClose: () => {
          this._closePopup();
        },
      }),
    });
  }

  private static createChatHeader(
    activeChat: ChatsPageMainProps['activeChat'],
    handlers: {
      onUploadAvatar: () => void;
      onAddUser: () => void;
      onRemoveUser: () => void;
      onRemoveChat: () => void;
    }
  ) {
    return new ChatHeader({
      avatar: {
        size: 'm',
        src: activeChat?.avatar ? getAvatarUrl(activeChat.avatar) : '',
        alt: activeChat?.avatar ? 'Аватар' : '',
        name: activeChat?.title ?? '',
        isEmpty: !activeChat?.avatar,
        isEditable: true,
        onClick: handlers.onUploadAvatar,
      },
      onAddUser: handlers.onAddUser,
      onRemoveUser: handlers.onRemoveUser,
      onRemoveChat: handlers.onRemoveChat,
    });
  }

  private _openPopup(popup: ChatPopups) {
    this.activePopup = popup;
    this._updatePopups();
  }

  private _closePopup() {
    this.activePopup = null;
    this._updatePopups();
  }

  private _updatePopups() {
    (this.children.avatarPopup as AvatarUploadPopup).setProps({
      isOpened: this.activePopup === 'uploadAvatar',
    });

    (this.children.addUserPopup as AddUserPopup).setProps({
      isOpened: this.activePopup === 'addUser',
    });

    (this.children.removeUserPopup as RemoveUserPopup).setProps({
      isOpened: this.activePopup === 'removeUser',
    });
  }

  private _uploadAvatar(file: File) {
    if (this.props.activeChat?.id) {
      this.chatsController.updateAvatar(this.props.activeChat.id, file);
      this._closePopup();
    }
  }

  componentDidUpdate(
    oldProps: ChatsPageMainBlockProps,
    newProps: ChatsPageMainBlockProps
  ): boolean {
    const activeChatIdChanged =
      oldProps.activeChat?.id !== newProps.activeChat?.id;
    const activeChatAvatarChanged =
      oldProps.activeChat?.avatar !== newProps.activeChat?.avatar;

    if (activeChatIdChanged) {
      this.children.header = ChatsPageMain.createChatHeader(
        newProps.activeChat,
        {
          onUploadAvatar: () => this._openPopup('uploadAvatar'),
          onAddUser: () => this._openPopup('addUser'),
          onRemoveUser: () => this._openPopup('removeUser'),
          onRemoveChat: () =>
            this.chatsController.removeChat(newProps.activeChat),
        }
      );

      return true;
    }

    if (activeChatAvatarChanged) {
      const header = this.children.header as ChatHeader;

      header.setProps({
        avatarProps: {
          size: 'm',
          src: newProps.activeChat?.avatar
            ? getAvatarUrl(newProps.activeChat.avatar)
            : '',
          alt: newProps.activeChat?.avatar ? 'Аватар' : '',
          name: newProps.activeChat?.title ?? '',
          isEmpty: !newProps.activeChat?.avatar,
          isEditable: true,
          onClick: () => this._openPopup('uploadAvatar'),
        },
      });
    }

    return false;
  }

  render(): string {
    const { activeChat } = this.props;

    const renderHeader = () => {
      if (!activeChat) {
        return '';
      }

      return '{{{header}}}';
    };

    const renderMessageControl = () => {
      if (!activeChat) {
        return '';
      }

      return '{{{messageControl}}}';
    };

    return `
      <section class="chats-page">
        ${renderHeader()}

        <article class="chats-page__feed">Выберите чат, чтобы отправить сообщение</article>
        
        ${renderMessageControl()}
        {{{avatarPopup}}}
        {{{addUserPopup}}}
        {{{removeUserPopup}}}
      </section>
    `;
  }
}
