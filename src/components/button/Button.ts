import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import { Icon } from '../icon';
import './Button.scss';
import type { ButtonBlockProps, ButtonProps } from './Button.types';

export class Button extends Block<ButtonBlockProps> {
  constructor({ type, iconType, ...props }: ButtonProps) {
    super({
      ...props,
      type: type ?? 'button',
      iconBlock: new Icon({ type: iconType, color: props.color }),
      events: {
        click: (e: MouseEvent) => {
          props.onClick?.(e);
        },
      },
    });
  }

  componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps) {
    const buttonElement = this.element;

    if (oldProps.loading !== newProps.loading) {
      return true;
    }

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
      loading,
      iconType,
    } = this.props;

    const classNames = getClassName([
      'button',
      variant && `button_variant_${variant}`,
      !!icon && `button_icon_${icon}`,
      !!color && `button_color_${color}`,
      !!size && `button_size_${size}`,
      !!fullWidth && `button_fullWidth`,
      !!loading && `button_loading`,
    ]);

    const renderIcon = () => {
      if (iconType) {
        return '';
      }

      return '{{{iconBlock}}}';
    };

    return `
      <button
        id="{{id}}"
        type="{{type}}"
        class="${classNames}"
        ${disabled ? 'disabled' : ''}
      >
        ${loading ? '<div class="button__spinner"></div>' : ''}
        ${renderIcon()}
        {{text}}
      </button>
    `;
  }
}
