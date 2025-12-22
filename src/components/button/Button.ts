import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import './Button.scss';
import type { ButtonBlockProps, ButtonProps } from './Button.types';

export class Button extends Block<ButtonBlockProps> {
  constructor({ type, ...props }: ButtonProps) {
    super({
      ...props,
      type: type ?? 'button',
      events: {
        click: (e: MouseEvent) => {
          props.onClick?.(e);
        },
      },
    });
  }

  componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps) {
    const buttonElement = this.element;

    if (oldProps.disabled === newProps.disabled) {
      return false;
    }

    if (buttonElement instanceof HTMLButtonElement) {
      buttonElement.disabled = newProps.disabled ?? false;
      return false;
    }

    return true;
  }

  render() {
    const {
      variant = 'primary',
      icon,
      color,
      size,
      disabled,
      fullWidth,
    } = this.props;

    const classNames = getClassName([
      'button',
      variant && `button_variant_${variant}`,
      !!icon && `button_icon_${icon}`,
      !!color && `button_color_${color}`,
      !!size && `button_size_${size}`,
      !!fullWidth && `button_fullWidth`,
    ]);

    return `
      <button
        id="{{id}}"
        type="{{type}}"
        class="${classNames}"
        ${disabled ? 'disabled' : ''}
      >
        {{text}}
      </button>
    `;
  }
}
