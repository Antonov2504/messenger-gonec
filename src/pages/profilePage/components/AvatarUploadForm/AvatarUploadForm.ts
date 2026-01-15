import { Button } from '@/components/button';
import { Block } from '@/shared/Block';

import './AvatarUploadForm.scss';
import type {
  AvatarUploadFormBlockProps,
  AvatarUploadFormProps,
} from './AvatarUploadForm.types';

export class AvatarUploadForm extends Block<AvatarUploadFormBlockProps> {
  private file: File | null = null;

  constructor(props: AvatarUploadFormProps) {
    super({
      ...props,
      fileName: null,
      isUploaded: false,
      submitButton: new Button({
        id: 'profile-avatar-update-button',
        text: 'Поменять',
        type: 'submit',
        disabled: true,
      }),
      events: {
        submit: (e: Event) => this._handleSubmit(e),
        change: (e: Event) => this._handleFileChange(e),
      },
    });
  }

  private _handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;

    if (input.type !== 'file') {
      return;
    }

    this.file = input.files?.[0] ?? null;

    if (!this.file) {
      return;
    }

    this.setProps({
      fileName: this.file.name,
      isUploaded: true,
    });

    const button = this.children.submitButton as Button;
    button.setProps({ disabled: !this.file });
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.file) return;

    this.props.onSubmit(this.file);
  }

  render() {
    const { isUploaded, fileName } = this.props;

    const renderContent = () => {
      if (fileName) {
        return `<div class="avatar-upload__filename">${fileName}</div>`;
      }

      return `
        <label class="avatar-upload__link">
          Выбрать файл на компьютере
          <input 
            type="file"
            hidden
            accept="image/*"
            name="avatar"
          />
        </label>
        `;
    };

    return `
      <form class="avatar-upload">
        <h2 class="avatar-upload__title">
          ${isUploaded ? 'Файл загружен' : 'Загрузите файл'}
        </h2>

        ${renderContent()}

        {{{submitButton}}}
      </form>
    `;
  }
}
