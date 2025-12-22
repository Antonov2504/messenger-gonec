import { Button } from '@/components/button';
import { Block } from '@/shared/Block';

import type {
  ClipControlBlockProps,
  ClipControlProps,
} from './ClipControl.types';

export class ClipControl extends Block<ClipControlBlockProps> {
  constructor({ onClip }: ClipControlProps) {
    super({
      clipButton: new Button({
        id: 'chats-page-control-clip',
        variant: 'icon',
        icon: 'clip',
        size: 'm',
        onClick: onClip,
      }),
    });
  }
  protected render(): string {
    return `
      {{{clipButton}}}
    `;
  }
}
