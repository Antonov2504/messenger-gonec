import type { Button } from '@/components/button';
import type { Popover } from '@/modules/popover/Popover';
import type { Props as BlockProps } from '@/shared/Block';

import type { ChatOptionsPopover } from '../ChatOptionsPopover';

export type OptionsControlProps = {
  popoverContent: (onClose: () => void) => ChatOptionsPopover;
};

export type OptionsControlBlockProps = BlockProps & {
  buttonOptions: Button;
  popover: Popover;
};
