import type { Avatar } from '@/modules/avatar';
import type { Props as BlockProps } from '@/shared/Block';

import type { ChatsPageMainProps } from '../../ChatsPage.types';
import type { OptionsControl } from './components/OptionsControl';

export type ChatHeaderProps = {
  header: ChatsPageMainProps['header'];
};

export type ChatHeaderBlockProps = BlockProps & {
  avatar: Avatar;
  options: OptionsControl;
};
