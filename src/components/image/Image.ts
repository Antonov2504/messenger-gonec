import { Block } from '@/shared/Block';

import './Image.scss';
import type { ImageBlockProps } from './Image.types';

export class Image extends Block<ImageBlockProps> {
  protected render(): string {
    return `
      <img 
        class="image" 
        src="{{src}}" 
        alt="{{alt}}"
      />
    `;
  }
}
