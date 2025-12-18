import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import type { InputBlockProps, InputProps } from './Input.types';

export class Input extends Block<InputBlockProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        input: (e: Event) => {
          if (e.target) {
            const { name, value } = e.target as HTMLInputElement;
            this.props.onInput?.(name, value);
          }
        },
        blur: (e: Event) => {
          const { name } = e.target as HTMLInputElement;
          this.props.onBlur?.(name);
        },
      },
    });
  }

  componentDidUpdate(oldProps: InputProps, newProps: InputProps) {
    const inputElement = this.element;

    if (
      oldProps.value !== newProps.value &&
      inputElement instanceof HTMLInputElement
    ) {
      inputElement.value = newProps.value ?? '';
      return false;
    }

    return true;
  }

  render() {
    const {
      id,
      name,
      type = 'text',
      minlength,
      maxlength,
      placeholder,
      required,
      disabled,
      value,
    } = this.props;

    const className = getClassName(['form__input']);

    const attrs = [
      `id="${id}"`,
      `name="${name}"`,
      type && `type="${type}"`,
      minlength && `minlength="${minlength}"`,
      maxlength && `maxlength="${maxlength}"`,
      placeholder && `placeholder="${placeholder}"`,
      `value="${value ?? ''}"`,
      required && 'required',
      disabled && 'disabled',
      'autocomplete="off"',
    ]
      .filter(Boolean)
      .join(' ');

    return `<input class="${className}" ${attrs} />`;
  }
}
