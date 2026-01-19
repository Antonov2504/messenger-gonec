import type { UserDto } from '@/App.types';
import type { EmptyContainer } from '@/modules/emptyContainer';
import type { Form } from '@/modules/form';
import type { UsersList } from '@/modules/usersList';
import type { Props as BlockProps } from '@/shared/Block';

export type AddUserFormProps = {
  usersToAdd: UserDto[];
  chatUsers: UserDto[];
  onSearch: (login: string) => Promise<void>;
  onAddUser: (user: UserDto) => void;
};

export type AddUserFormBlockProps = BlockProps & {
  usersToAdd: UserDto[];
  chatUsers: UserDto[];
  isLoading: boolean;
  form: Form;
  usersList: UsersList | EmptyContainer;
};
