import type { UserDto } from '@/App.types';
import type { Button } from '@/components/button';
import type { Props as BlockProps } from '@/shared/Block';

import type { Avatar } from '../avatar';

export type UserRowProps = {
  user: UserDto;
  onAction?: (user: UserDto) => void;
  action?: 'add' | 'remove';
  status?: string;
};

export type UserRowBlockProps = BlockProps & {
  avatar: Avatar;
  addButton: Button;
  removeButton: Button;
  action?: 'add' | 'remove';
  status?: string;
};
