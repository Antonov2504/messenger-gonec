import type { UserDto } from '@/App.types';
import type { InfoField } from '@/modules/infoField';
import type { Props as BlockProps } from '@/shared/Block';

export type ProfileInfoProps = {
  info: UserDto;
};

export type ProfileInfoBlockProps = BlockProps & {
  info: InfoField[];
};
