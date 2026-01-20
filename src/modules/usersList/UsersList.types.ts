import type { UserDto } from '@/App.types';
import type { Props as BlockProps } from '@/shared/Block';

import type { UserRow } from '../userRow';

export type UsersListProps = {
  users: UserDto[];
  title?: string;
  action?: 'add' | 'remove';
  onAction?: (user: UserDto) => void;
  getStatus?: (user: UserDto) => string;
};

export type UsersListBlockProps = BlockProps & {
  rows: UserRow[];
  title?: string;
};
