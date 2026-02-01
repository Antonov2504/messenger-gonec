import { routes } from '@/App.constants';
import type { RoutePath } from '@/App.types';
import '@/tests/helpers/mockBlock';
import { resetRouterSingleton } from '@/tests/helpers/resetRouterSingleton';
import { TestBlock } from '@/tests/mocks/TestBlock';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import { Router } from './Router';

// mock UserSessionController
const mockFetchUser = jest.fn();
const mockIsLoggedIn = jest.fn();

jest.mock('@/pages/authPage/controllers/UserSession', () => ({
  UserSessionController: {
    getInstance: () => ({
      fetchUser: mockFetchUser,
      isLoggedIn: mockIsLoggedIn,
    }),
  },
}));

describe('test for Router', () => {
  let router: Router;

  beforeEach(() => {
    resetRouterSingleton();
    mockFetchUser.mockClear();
    mockIsLoggedIn.mockReset();

    router = new Router('#app');
  });

  // регистрация
  test('registers routes', () => {
    router.use(routes.login, () => new TestBlock());

    const route = router.getRoute('/');
    expect(route).toBeDefined();
  });

  // переход на другой роут
  test('changes pathname and renders route', () => {
    const renderSpy = jest.fn();

    router.use(routes.signup, () => {
      renderSpy();
      return new TestBlock();
    });

    router.go(routes.signup);

    expect(window.location.pathname).toBe('/sign-up');
    expect(renderSpy).toHaveBeenCalled();
  });

  // authRequired редирект
  test('redirects to login page if route requires auth and user is not logged in', () => {
    mockIsLoggedIn.mockReturnValue(false);

    router
      .use(routes.login, () => new TestBlock())
      .use('/private', () => new TestBlock(), true);

    router.go('/private' as RoutePath);

    expect(window.location.pathname).toBe(routes.login);
  });

  // publicRoutes редирект
  test('redirects from public route to chats if user is logged in', () => {
    mockIsLoggedIn.mockReturnValue(true);

    router
      .use(routes.chats, () => new TestBlock(), true)
      .use(routes.login, () => new TestBlock());

    router.go(routes.login);

    expect(window.location.pathname).toBe(routes.chats);
  });

  // редирект на страницу 404
  test('renders fallback "*" route if route not found', () => {
    const renderSpy = jest.fn();

    router.use('*', () => {
      renderSpy();
      return new TestBlock();
    });

    router.go('/unknown' as RoutePath);

    expect(renderSpy).toHaveBeenCalled();
  });

  // запуск роутера
  test('start() fetches user only once', async () => {
    mockIsLoggedIn.mockReturnValue(false);

    router.use(routes.login, () => new TestBlock());

    await router.start();
    await router.start();

    expect(mockFetchUser).toHaveBeenCalledTimes(1);
  });

  // навигация по history API
  test('calls history.back() and history.forward()', () => {
    router.use(routes.login, () => new TestBlock());

    const backSpy = jest.spyOn(window.history, 'back');
    const forwardSpy = jest.spyOn(window.history, 'forward');

    router.back();
    expect(backSpy).toHaveBeenCalled();

    router.forward();
    expect(forwardSpy).toHaveBeenCalled();

    backSpy.mockRestore();
    forwardSpy.mockRestore();
  });
});
