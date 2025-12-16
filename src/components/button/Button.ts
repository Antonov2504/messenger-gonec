import { Block } from '@/shared/Block';

import type { ButtonProps } from './Button.types';

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
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
      type = 'button',
      variant = 'primary',
      icon,
      color,
      size,
      disabled,
    } = this.props;

    const classNames = [
      'button',
      variant && `button_variant_${variant}`,
      icon && `button_icon_${icon}`,
      color && `button_color_${color}`,
      size && `button_size_${size}`,
    ]
      .filter(Boolean)
      .join(' ');

    return `
      <button
        id={{id}}
        type="${type}"
        class="${classNames}"
        ${disabled ? 'disabled' : ''}
      >
        {{text}}
      </button>
    `;
  }
}
