import type { UserInfoDto } from '@/App.types';

export type ProfilePageProps = {
  avatar: {
    isEmpty: boolean;
    src: string;
    alt: string;
    size: string;
  };
  info: UserInfoDto;
};
