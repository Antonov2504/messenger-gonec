import type { Button } from '@/components/button';
import type { Props as BlockProps } from '@/shared/Block';

export type ProfileActionsProps = {
  isLoadingLogout: boolean;
  onEdit: (e?: MouseEvent) => void;
  onChangePassword: (e?: MouseEvent) => void;
  onLogout: (e?: MouseEvent) => void;
};

export type ProfileActionsBlockProps = BlockProps & {
  buttonEdit: Button;
  buttonChangePassword: Button;
  buttonLogout: Button;
};
