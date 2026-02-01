import { Router } from '@/shared/Router/Router';

export const resetRouterSingleton = () => {
  (Router as unknown as { __instance: Router | null }).__instance = null;
};
