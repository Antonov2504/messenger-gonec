import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import './TextArea.scss';
import type { TextAreaBlockProps, TextAreaProps } from './TextArea.types';

export class TextArea extends Block<TextAreaBlockProps> {
  constructor(props: TextAreaProps) {
    super({
      ...props,
      events: {
        input: (e: Event) => {
          if (e.target) {
            const { name, value } = e.target as HTMLTextAreaElement;
            this.props.onInput?.(name, value);
          }
        },
        keydown: (e: KeyboardEvent) => {
          if (e.key !== 'Enter') {
            return;
          }

          if (e.shiftKey || e.ctrlKey) {
            return;
          }

          e.preventDefault();
          this.props.onEnter?.();
        },
      },
    });
  }

  componentDidUpdate(oldProps: TextAreaProps, newProps: TextAreaProps) {
    const textAreaElement = this.element;

    if (
      oldProps.value !== newProps.value &&
      textAreaElement instanceof HTMLTextAreaElement
    ) {
      textAreaElement.value = newProps.value ?? '';
      this._autoGrow();
      return false;
    }

    return true;
  }

  private _autoGrow = () => {
    const textAreaElement = this.element;

    if (!(textAreaElement instanceof HTMLTextAreaElement)) {
      return;
    }

    const computed = getComputedStyle(textAreaElement);

    const computedLinHeight = computed.lineHeight;
    const lineHeight = Number.isNaN(parseFloat(computedLinHeight))
      ? 20
      : parseFloat(computedLinHeight);

    const borderWidth =
      Number(parseInt(computed.borderTopWidth)) +
      Number(parseInt(computed.borderBottomWidth));

    const rows = this.props.rows ?? 1;
    const maxRows = this.props.maxRows ?? rows;

    const maxHeight = maxRows * lineHeight;

    textAreaElement.style.height = 'auto';
    textAreaElement.style.height =
      Math.min(textAreaElement.scrollHeight + borderWidth, maxHeight) + 'px';
  };

  render() {
    const {
      id,
      name,
      type = 'text',
      minlength,
      maxlength,
      placeholder,
      cols,
      rows,
      ariaLabel,
      required,
      disabled,
      readonly,
      value,
    } = this.props;

    const className = getClassName(['form__textarea', 'autogrow']);

    const attrs = [
      `id="${id}"`,
      `name="${name}"`,
      type && `type="${type}"`,
      minlength && `minlength="${minlength}"`,
      maxlength && `maxlength="${maxlength}"`,
      placeholder && `placeholder="${placeholder}"`,
      cols && `cols="${cols}"`,
      rows && `rows="${rows}"`,
      required && 'required',
      readonly && 'readonly',
      disabled && 'disabled',
      ariaLabel && `aria-label="${ariaLabel}"`,
      'autocomplete="off"',
    ]
      .filter(Boolean)
      .join(' ');

    return `<textarea class="${className}" ${attrs}>${value ?? ''}</textarea>`;
  }
}
