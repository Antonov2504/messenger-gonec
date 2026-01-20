import { Block, type Props as BlockProps } from '@/shared/Block';

import './ChatDateSeparator.scss';

type ChatDateSeparatorBlockProps = BlockProps & {
  date: string;
};

export class ChatDateSeparator extends Block<ChatDateSeparatorBlockProps> {
  render(): string {
    return `
      <div class="chat-date-separator">
        <div class="chat-date-separator__line"></div>
        <span>${this.props.date}</span>
        <div class="chat-date-separator__line"></div>
      </div>
    `;
  }
}
