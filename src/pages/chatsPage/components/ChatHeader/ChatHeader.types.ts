import type { Avatar, AvatarProps } from '@/modules/avatar';
import type { Props as BlockProps } from '@/shared/Block';

import type { OptionsControl } from './components/OptionsControl';

export type ChatHeaderProps = {
  avatar: AvatarProps;
  onAddUser: () => void;
  onRemoveUser: () => void;
  onRemoveChat: () => void;
};

export type ChatHeaderBlockProps = BlockProps & {
  avatar: Avatar;
  avatarProps: AvatarProps;
  options: OptionsControl;
};
