import type { BasePageConfig } from '@/pages/PageFactory';
import { connect } from '@/services/store';

import { ChatsPageMain } from './ChatsPageMain';
import { ChatsPageSidebar } from './ChatsPageSidebar';
import { mapMessengerToMainProps } from './mapMessengerToMainProps';
import { mapMessengerToSidebarProps } from './mapMessengerToSidebarProps';

const ChatsPageSidebarConnected = connect(
  ChatsPageSidebar,
  mapMessengerToSidebarProps
);

const ChatsPageMainConnected = connect(ChatsPageMain, mapMessengerToMainProps);

export const chatsPageConfig: BasePageConfig = {
  authRequired: true,
  sidebar: () => new ChatsPageSidebarConnected({}),
  content: () => new ChatsPageMainConnected({}),
};
