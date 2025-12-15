import { Block } from '@/shared/Block';

import type { InputProps } from './Input.types';

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    const {
      id,
      name,
      type = 'text',
      required,
      minlength,
      maxlength,
      placeholder,
      value,
    } = this.props;

    const attrs = [
      id && `id="${id}"`,
      name && `name="${name}"`,
      type && `type="${type}"`,
      required && 'required',
      minlength && `minlength="${minlength}"`,
      maxlength && `maxlength="${maxlength}"`,
      placeholder && `placeholder="${placeholder}"`,
      value && `value="${value}"`,
      'autocomplete="off"',
      'class="form__input"',
    ]
      .filter(Boolean)
      .join(' ');

    return `<input ${attrs} />`;
  }
}
