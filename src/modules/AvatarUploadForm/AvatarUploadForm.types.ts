import type { Button } from '@/components/button';
import type { Props as BlockProps } from '@/shared/Block';

export type AvatarUploadFormProps = {
  onSubmit: (file: File) => void;
};

export type AvatarUploadFormBlockProps = BlockProps & {
  fileName: string | null;
  isUploaded: boolean;
  submitButton: Button;
  onSubmit: (file: File) => void;
};
