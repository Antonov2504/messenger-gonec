import { InfoField } from '@/modules/infoField';
import { Block } from '@/shared/Block';

import type {
  ProfileInfoBlockProps,
  ProfileInfoProps,
} from './ProfileInfo.types';

export class ProfileInfo extends Block<ProfileInfoBlockProps> {
  constructor({ info }: ProfileInfoProps) {
    super({
      info: [
        new InfoField({ label: 'Почта', value: info.email }),
        new InfoField({ label: 'Логин', value: info.login }),
        new InfoField({ label: 'Имя', value: info.first_name }),
        new InfoField({ label: 'Фамилия', value: info.second_name }),
        new InfoField({ label: 'Имя в чате', value: info.display_name }),
        new InfoField({ label: 'Телефон', value: info.phone }),
      ],
    });
  }
  protected render(): string {
    return `<ul class="profile-page__info">{{{info}}}</ul>`;
  }
}
