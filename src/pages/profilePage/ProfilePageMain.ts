import { Avatar } from '@/modules/avatar';
import { Store } from '@/services/store';
import { Block } from '@/shared/Block';

import { UserSessionController } from '../authPage/controllers/UserSession';
import './ProfilePage.scss';
import type {
  ProfilePageMainBlockProps,
  ProfilePageMainProps,
} from './ProfilePage.types';
import { ProfileActions } from './components/ProfileActions';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfileInfoForm } from './components/ProfileInfoForm';
import { ProfilePasswordForm } from './components/ProfilePasswordForm';
import { UserProfileController } from './controllers/UserProfileController';
import type { ChangePasswordFormModel } from './models/ChangePasswordFormModel';
import type { EditProfileFormModel } from './models/EditProfileFormModel';
import { PAGE_MODE } from './profile.page';

export class ProfilePageMain extends Block<ProfilePageMainBlockProps> {
  private store = Store.getInstance();
  private profileController = UserProfileController.getInstance();

  constructor({
    mode,
    avatar,
    info,
    isLoadingLogout,
    onLogout,
    onEdit,
    onChangePassword,
    onCancel,
  }: ProfilePageMainProps) {
    super({
      mode,
      avatar: new Avatar(avatar),
      view: new ProfileInfo({ info }),
      edit: new ProfileInfoForm({
        info,
        onSubmitEditProfile: (values) => this._handleSubmitEditProfile(values),
        onCancelEditProfile: onCancel,
      }),
      changePassword: new ProfilePasswordForm({
        onSubmitChangePassword: (values) =>
          this._handleSubmitChangePassword(values),
        onCancelChangePassword: onCancel,
      }),
      actions: new ProfileActions({
        isLoadingLogout,
        onEdit,
        onChangePassword,
        onLogout,
      }),
      name: info.first_name,
      info,
      isLoadingLogout,
      onCancel,
    });
  }

  get avatar(): Avatar {
    return this.children.avatar as Avatar;
  }

  get actions(): ProfileActions {
    return this.children.actions as ProfileActions;
  }

  private _handleSubmitEditProfile(values: EditProfileFormModel) {
    this.profileController.updateProfile(values);
  }

  private _handleSubmitChangePassword(values: ChangePasswordFormModel) {
    this.profileController.changePassword(values);
  }

  componentDidMount() {
    const user = this.store.getState().user;
    if (!user) {
      const session = UserSessionController.getInstance();
      session.fetchUser();
    }
  }

  componentDidUpdate(
    _: ProfilePageMainBlockProps,
    newProps: ProfilePageMainBlockProps
  ) {
    const { mode, info, isLoadingLogout, onCancel } = newProps;

    this.avatar.setProps({
      name: newProps.mode === 'view' ? info.first_name : undefined,
    });

    this.actions.buttonLogout.setProps({
      loading: isLoadingLogout,
      disabled: isLoadingLogout,
    });

    switch (mode) {
      case 'view':
        this.children.view = new ProfileInfo({ info });
        break;
      case 'edit':
        this.children.edit = new ProfileInfoForm({
          info,
          onSubmitEditProfile: (values) =>
            this._handleSubmitEditProfile(values),
          onCancelEditProfile: onCancel,
        });
        break;
      case 'changePassword':
        this.children.changePassword = new ProfilePasswordForm({
          onSubmitChangePassword: (values) =>
            this._handleSubmitChangePassword(values),
          onCancelChangePassword: onCancel,
        });
        break;
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
