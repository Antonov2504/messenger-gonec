import type { Button } from '@/components/button';
import type { TextArea } from '@/components/textArea';
import type { Props as BlockProps } from '@/shared/Block';

import type { ClipControl } from './components/ClipControl';

export type ChatMessageControlProps = {
  onClip: () => void;
  onSend: (message: string) => void;
};

export type ChatMessageControlBlockProps = BlockProps & {
  clip: ClipControl;
  message: TextArea;
  sendButton: Button;
  onSend: (message: string) => void;
};
