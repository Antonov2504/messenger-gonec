import { Avatar } from '@/modules/avatar';
import { Block } from '@/shared/Block';
import { getAvatarUrl } from '@/shared/utils/string';

import { AvatarUploadPopup } from '../../modules/AvatarUploadPopup';
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
  private isAvatarPopupOpen = false;

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
      avatar: new Avatar({
        ...avatar,
        onClick: () => this._openAvatarPopup(),
      }),
      view: new ProfileInfo({ info }),
      edit: new ProfileInfoForm({
        info,
        onSubmitEditProfile: (values) =>
          this._handleSubmitEditProfile(values as EditProfileFormModel),
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
      avatarPopup: new AvatarUploadPopup({
        isOpened: false,
        onClose: () => this._closeAvatarPopup(),
        onSubmit: (file) => this._uploadAvatar(file),
      }),
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

  private _openAvatarPopup() {
    this.isAvatarPopupOpen = true;
    this._updatePopup();
  }

  private _closeAvatarPopup() {
    this.isAvatarPopupOpen = false;
    this._updatePopup();
  }

  private _updatePopup() {
    const popup = this.children.avatarPopup as AvatarUploadPopup;
    popup.setProps({
      isOpened: this.isAvatarPopupOpen,
    });
  }

  private _uploadAvatar(file: File) {
    this.profileController.updateAvatar(file);
    this._closeAvatarPopup();
  }

  componentDidUpdate(
    oldProps: ProfilePageMainBlockProps,
    newProps: ProfilePageMainBlockProps
  ) {
    const { mode, info, isLoadingLogout, onCancel } = newProps;

    if (oldProps.info.avatar !== info.avatar) {
      this.children.avatar = new Avatar({
        src: info.avatar ? `${getAvatarUrl(info.avatar)}?t=${Date.now()}` : '',
        alt: info.avatar ? 'Аватар профиля' : '',
        name: newProps.mode === 'view' ? info.first_name : undefined,
        isEmpty: !info.avatar,
        isEditable: true,
        type: 'column',
        size: 'l',
        onClick: () => this._openAvatarPopup(),
      });
    }

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
            this._handleSubmitEditProfile(values as EditProfileFormModel),
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
        {{{avatarPopup}}}
      </article>
    `;
  }
}
