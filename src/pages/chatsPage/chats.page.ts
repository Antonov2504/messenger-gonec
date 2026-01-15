import { chatsPageTemplateData } from '@/App.constants';
import type { BasePageConfig } from '@/pages/PageFactory';

import { ChatsPageMain } from './ChatsPageMain';
import { ChatsPageSidebar } from './ChatsPageSidebar';

export const chatsPageConfig: BasePageConfig = {
  authRequired: true,
  sidebar: new ChatsPageSidebar(chatsPageTemplateData),
  content: () => new ChatsPageMain(chatsPageTemplateData),
};
