import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import { Input } from '../input';
import type { FieldBlockProps, FieldProps, GetClassName } from './Field.types';

export class Field extends Block<FieldBlockProps> {
  constructor({
    label,
    inputType,
    fieldType,
    error,
    required,
    ...inputProps
  }: FieldProps) {
    super({
      label,
      className: Field.getClassName({ fieldType, error }),
      input: new Input({
        type: inputType ?? 'text',
        ...inputProps,
      }),
      fieldType,
      required,
      error,
    });
  }

  get input(): Input {
    return this.children.input as Input;
  }

  setError(error?: string) {
    this.setProps({
      error,
      className: Field.getClassName({ fieldType: this.props.fieldType, error }),
    });
  }

  private static getClassName({ fieldType, error }: GetClassName) {
    return [
      'form__field',
      fieldType && `form__field_type_${fieldType}`,
      !!error && 'form__field_error',
    ]
      .filter(Boolean)
      .join(' ');
  }

  render() {
    const { className, label, fieldType, required, error } = this.props;

    const labelClassName = getClassName([
      'form__label',
      !!required && 'form__label_required',
    ]);

    const labelHtml = label ? `<p class="${labelClassName}">${label}</p>` : '';

    const errorHtml = error
      ? `<span class="form__input-error">${error}</span>`
      : '';

    const iconSearchHtml =
      fieldType === 'search'
        ? '<span class="form__input-icon form__input-icon_search"></span>'
        : '';

    return `
      <label class="${className}">
        ${labelHtml}
        {{{input}}}
        
        ${errorHtml}
        ${iconSearchHtml}
      </label>
    `;
  }
}
