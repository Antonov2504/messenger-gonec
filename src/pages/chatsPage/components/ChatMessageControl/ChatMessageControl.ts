import { Button } from '@/components/button';
import { ControlledField } from '@/components/controlledField';
import { TextArea } from '@/components/textArea';

import type {
  ChatMessageControlBlockProps,
  ChatMessageControlProps,
} from './ChatMessageControl.types';
import { ClipControl } from './components/ClipControl';

export class ChatMessageControl extends ControlledField<ChatMessageControlBlockProps> {
  constructor({ onClip, onSend }: ChatMessageControlProps) {
    super({
      clip: new ClipControl({ onClip }),
      message: new TextArea({
        id: 'chats-page-message-textarea',
        name: 'message',
        placeholder: 'Сообщение',
        rows: 1,
        maxRows: 6,
        maxlength: 1500,
        onInput: (_name, value) => this.setValue(value),
        onEnter: () => this._handleSend(),
      }),
      sendButton: new Button({
        id: 'chats-page-control-send',
        type: 'button',
        variant: 'primary-icon',
        icon: 'arrow',
        disabled: true,
        onClick: () => this._handleSend(),
      }),
      onSend,
    });
  }
  get message() {
    return this.children.message as TextArea;
  }

  get sendButton() {
    return this.children.sendButton as Button;
  }

  private _handleSend = () => {
    const trimValue = this._value.trim();

    if (!trimValue) {
      return;
    }

    this.props.onSend(trimValue);
    this.resetValue('');
  };

  protected onChangeValue(value: string) {
    this.message.setProps({ value });

    const disabled = !value.trim();

    if (this.sendButton.props.disabled !== disabled) {
      this.sendButton.setProps({ disabled });
    }
  }

  protected render(): string {
    return `
      <footer class="chats-page__message-control">
        {{{clip}}}
        {{{message}}}
        {{{sendButton}}}
    </footer>
    `;
  }
}
