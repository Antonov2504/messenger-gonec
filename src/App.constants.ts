export const routes = {
  login: '/',
  signup: '/sign-up',
  profile: '/settings',
  chats: '/messenger',
  maintenance: '/maintenance',
  notFound: '*',
} as const;

export const publicRoutes = [routes.login, routes.signup];
