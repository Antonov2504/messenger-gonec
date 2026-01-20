import type { ChatDto, UserDto } from '@/App.types';
import type { EmptyContainer } from '@/modules/emptyContainer';
import type { UsersList } from '@/modules/usersList';
import type { Props as BlockProps } from '@/shared/Block';

export type RemoveUserFormProps = {
  chatUsers: UserDto[];
  activeChat: ChatDto | null;
  onRemoveUser: (user: UserDto) => void;
};

export type RemoveUserFormBlockProps = BlockProps & {
  chatUsers: UserDto[];
  activeChat: ChatDto | null;
  isLoading: boolean;
  usersList: UsersList | EmptyContainer;
};
