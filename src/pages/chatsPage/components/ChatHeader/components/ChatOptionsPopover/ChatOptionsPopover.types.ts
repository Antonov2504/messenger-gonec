import type { Button } from '@/components/button';
import type { Props } from '@/shared/Block';

export type ChatOptionsPopoverProps = {
  onAddUser: () => void;
  onRemoveUser: () => void;
  onRemoveChat: () => void;
};

export type ChatOptionsPopoverBlockProps = Props & {
  addUserButton: Button;
  removeUserButton: Button;
  removeChatButton: Button;
};
