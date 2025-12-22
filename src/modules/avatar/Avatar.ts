import { Image } from '@/components/image';
import { Block } from '@/shared/Block';
import { getClassName } from '@/shared/utils/string';

import './Avatar.scss';
import type { AvatarBlockProps, AvatarProps } from './Avatar.types';

export class Avatar extends Block<AvatarBlockProps> {
  constructor({ src, alt, ...props }: AvatarProps) {
    super({
      ...props,
      image: new Image({ src, alt }),
    });
  }

  protected render(): string {
    const { isEmpty, isEditable, type, size, name } = this.props;

    const className = getClassName([
      'avatar',
      !!isEmpty && 'avatar_empty',
      !!isEditable && 'avatar_editable',
      !!type && `avatar_type_${type}`,
      !!size && `avatar_size_${size}`,
    ]);

    return `
      <figure class="${className}">
        <div class="avatar__image">
          {{{image}}}
        </div>
        ${name ? '<figcaption class="avatar__name">{{name}}</figcaption>' : ''}
      </figure>
    `;
  }
}
