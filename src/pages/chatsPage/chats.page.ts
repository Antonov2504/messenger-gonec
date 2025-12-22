import { appFooterTemplateLinks, chatsPageTemplateData } from '@/App.constants';
import type { BasePageConfig } from '@/pages/PageFactory';

import { ChatsPageMain } from './ChatsPageMain';
import { ChatsPageSidebar } from './ChatsPageSidebar';

export const chatsPageConfig: BasePageConfig = {
  sidebar: new ChatsPageSidebar(chatsPageTemplateData),
  content: new ChatsPageMain(chatsPageTemplateData),
  footer: {
    links: appFooterTemplateLinks,
  },
};
