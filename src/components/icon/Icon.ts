import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import './Icon.scss';
import type { IconBlockProps } from './Icon.types';

export class Icon extends Block<IconBlockProps> {
  render(): string {
    const classNames = getClassName([
      'icon',
      !!this.props.type && `icon_type_${this.props.type}`,
      !!this.props.color && `icon_color_${this.props.color}`,
    ]);

    return this.props.type ? `<div class="${classNames}"></div>` : '';
  }
}
