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

  render() {
    const {
      type = 'button',
      variant = 'primary',
      icon,
      color,
      size,
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
      >
        {{text}}
      </button>
    `;
  }
}
