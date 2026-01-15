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
import type { ChangePasswordForm } from './components/ProfilePasswordForm/ProfilePasswordForm.types';
import { UserProfileController } from './controllers/UserProfileController';
import type { EditProfileFormModel } from './models/EditProfileFormModel';
import { PAGE_MODE } from './profile.page';

export class ProfilePageMain extends Block<ProfilePageMainBlockProps> {
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
          this._handleSubmitChangePassword(values as ChangePasswordForm),
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

  private _handleSubmitChangePassword({
    oldPassword,
    password,
  }: ChangePasswordForm) {
    this.profileController.changePassword({
      oldPassword,
      newPassword: password,
    });
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
            this._handleSubmitChangePassword(values as ChangePasswordForm),
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
