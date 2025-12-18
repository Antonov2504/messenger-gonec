import { Avatar } from '@/modules/avatar';
import { Block } from '@/shared/Block';

import './ProfilePage.scss';
import type {
  ProfilePageMainBlockProps,
  ProfilePageMainProps,
} from './ProfilePage.types';
import { ProfileActions } from './components/ProfileActions';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfileInfoForm } from './components/ProfileInfoForm';
import { ProfilePasswordForm } from './components/ProfilePasswordForm';
import { PAGE_MODE } from './profile.page';

export class ProfilePageMain extends Block<ProfilePageMainBlockProps> {
  constructor({ avatar, info }: ProfilePageMainProps) {
    super({
      mode: 'view',
      avatar: new Avatar(avatar),
      view: new ProfileInfo({
        info,
      }),
      edit: new ProfileInfoForm({
        info,
        onSubmitEditProfile: (values) => this._handleSubmitEditProfile(values),
        onCancelEditProfile: () => this.setProps({ mode: 'view' }),
      }),
      changePassword: new ProfilePasswordForm({
        onSubmitChangePassword: (values) =>
          this._handleSubmitChangePassword(values),
        onCancelChangePassword: () => this.setProps({ mode: 'view' }),
      }),
      actions: new ProfileActions({
        onEdit: () => this.setProps({ mode: 'edit' }),
        onChandgePassword: () => this.setProps({ mode: 'changePassword' }),
        onLogout: () => console.log('logout'),
      }),
      name: info.first_name,
    });
  }

  get avatar(): Avatar {
    return this.children.avatar as Avatar;
  }

  private _handleSubmitEditProfile(values: Record<string, string>) {
    console.log('submit-edit-profile', { values });
    this.setProps({ mode: 'view' });
  }

  private _handleSubmitChangePassword(values: Record<string, string>) {
    console.log('submit-change-password', { values });
    this.setProps({ mode: 'view' });
  }

  // TODO: оптимизировать с появлением контекста
  componentDidUpdate(
    oldProps: ProfilePageMainBlockProps,
    newProps: ProfilePageMainBlockProps
  ) {
    if (oldProps.mode !== newProps.mode) {
      this.avatar.setProps({
        name: newProps.mode === 'view' ? this.props.name : undefined,
      });
    }

    return true;
  }

  render() {
    const { content, showActions } = PAGE_MODE[this.props.mode];

    return `
      <article class="profile-page">
        {{{avatar}}}
        {{{${content}}}}
        ${showActions ? '{{{actions}}}' : ''}
      </article>
    `;
  }
}
