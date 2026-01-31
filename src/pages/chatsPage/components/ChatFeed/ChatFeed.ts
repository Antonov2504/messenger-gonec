import type { UserDto, WSMessageDto } from '@/App.types';
import { Block } from '@/shared/Block';
import { formatMessageDateToMessageBlock } from '@/shared/utils/date';
import { deepEqual } from '@/shared/utils/deepEqual';
import { isScrolledToBottom } from '@/shared/utils/dom';

import './ChatFeed.scss';
import type { ChatFeedBlockProps, ChatFeedProps } from './ChatFeed.types';
import { ChatDateSeparator } from './components/ChatDateSeparator';
import { ChatMessage } from './components/ChatMessage';

export class ChatFeed extends Block<ChatFeedBlockProps> {
  private mapUserIdToAvatar: Record<number, string> = {};
  private shouldAutoScroll = true;
  private isLoadingHistory = false;
  private isPrependingHistory = false;
  private usersSignature = '';
  private onLoadMore: ChatFeedProps['onLoadMore'];

  constructor({ ...props }: ChatFeedProps) {
    super({
      ...props,
      messageBlocks: [],
    });

    this.onLoadMore = props.onLoadMore;
  }

  private getScrollContainer(): HTMLElement | null {
    return this.element?.closest('.chats-page__feed') as HTMLElement | null;
  }

  private getAvatarsMap(users: UserDto[]) {
    const mapUserIdToAvatar = users.reduce<Record<number, string>>(
      (acc, user) => {
        acc[user.id] = user.avatar;
        return acc;
      },
      {}
    );

    this.mapUserIdToAvatar = mapUserIdToAvatar;
  }

  private buildMessageBlocks(
    messages: WSMessageDto[],
    currentUserId: number | null
  ) {
    const blocks: Block[] = [];
    let lastDate: string | null = null;

    messages.forEach((message) => {
      const messageDate = formatMessageDateToMessageBlock(message.time);
      if (messageDate !== lastDate) {
        blocks.push(new ChatDateSeparator({ date: messageDate }));
        lastDate = messageDate;
      }

      blocks.push(
        new ChatMessage({
          message,
          avatar: this.mapUserIdToAvatar[message.user_id],
          isActive: message.user_id === currentUserId,
        })
      );
    });

    return blocks;
  }

  private getUsersSignature(users: UserDto[]) {
    return users?.map(({ id, avatar }) => `${id}:${avatar}`).join('|') ?? '';
  }

  private loadMoreHistory() {
    if (this.isLoadingHistory) {
      return;
    }

    this.isLoadingHistory = true;
    this.isPrependingHistory = true;
    this.onLoadMore();
  }

  private handleScroll = () => {
    const scrolledElement = this.getScrollContainer();

    if (!scrolledElement) {
      return;
    }

    this.shouldAutoScroll = isScrolledToBottom(scrolledElement);

    if (scrolledElement.scrollTop < 50) {
      this.loadMoreHistory();
    }
  };

  private updateScroll = (messagesChanged: boolean) => {
    const scrollContainer = this.getScrollContainer();

    if (!scrollContainer) {
      return;
    }

    const prevHeight = scrollContainer.scrollHeight;
    const prevScrollTop = scrollContainer.scrollTop;

    setTimeout(() => {
      const newHeight = scrollContainer.scrollHeight;

      // Если догружали историю - сохраняем позицию
      if (this.isPrependingHistory) {
        const diff = newHeight - prevHeight;
        scrollContainer.scrollTo({
          top: prevScrollTop + diff,
        });

        this.isPrependingHistory = false;
        this.isLoadingHistory = false;
        return;
      }

      // Если новое сообщение и пользователь был внизу - скроллим вниз
      if (messagesChanged && this.shouldAutoScroll) {
        scrollContainer.scrollTo({ top: newHeight });
      }
    }, 0);
  };

  componentDidMount() {
    const scrollContainer = this.getScrollContainer();
    scrollContainer?.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    const scrollContainer = this.getScrollContainer();
    scrollContainer?.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(
    oldProps: ChatFeedBlockProps,
    newProps: ChatFeedBlockProps
  ) {
    const scrollContainer = this.getScrollContainer();
    scrollContainer?.removeEventListener('scroll', this.handleScroll);
    scrollContainer?.addEventListener('scroll', this.handleScroll);

    const newSignature = this.getUsersSignature(newProps.users);
    const chatUsersChanged = newSignature !== this.usersSignature;

    const messagesChanged = !deepEqual(oldProps.messages, newProps.messages);
    const loadingChanged = oldProps.isLoading !== newProps.isLoading;

    // При обновлении пользователей в чате обновляем маппер и кеш пользователей
    if (chatUsersChanged) {
      this.usersSignature = newSignature;
      this.getAvatarsMap(newProps.users);
    }

    // Обновляем ленту при обновлении сообщений или изенении списка пользователей
    if (messagesChanged || chatUsersChanged) {
      this.children.messageBlocks = this.buildMessageBlocks(
        newProps.messages,
        newProps.currentUserId
      );
    }

    // Обновляем скролл
    this.updateScroll(messagesChanged);

    // Перерисовываем ленту при обновлении сообщений или изменении флага загрузки
    if (messagesChanged || loadingChanged) {
      this.isLoadingHistory = false;
      return true;
    }

    return false;
  }

  render(): string {
    const { isLoading, isActive } = this.props;
    if (isLoading) {
      return `
        <div class="chat-feed chat-feed_empty">
          Загрузка...
        </div>
      `;
    }

    if (!isActive) {
      return `
        <div class="chat-feed chat-feed_empty">
          Выберите чат, чтобы отправить сообщение
        </div>
      `;
    }

    if (isActive && !(this.children.messageBlocks as ChatMessage[])?.length) {
      return `
        <div class="chat-feed chat-feed_empty">
          Здесь появятся сообщения
        </div>
      `;
    }

    return `
      <div class="chat-feed chat-feed_active">
        {{{messageBlocks}}}
      </div>
    `;
  }
}
