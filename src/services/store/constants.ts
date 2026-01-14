import type { AppState } from './types';

export const initialState: AppState = {
  user: null,
  settings: {
    isLoadingLogout: false,
    mode: 'view',
  },
};
