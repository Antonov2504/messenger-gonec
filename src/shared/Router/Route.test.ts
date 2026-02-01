import { routes } from '@/App.constants';
import { TestBlock } from '@/tests/mocks/TestBlock';

import { Route } from './Route';

describe('Route', () => {
  const ROOT_QUERY = '#app';
  let root: HTMLElement;

  beforeEach(() => {
    root = document.querySelector(ROOT_QUERY)!;
  });

  test('match returns true for exact pathname', () => {
    const route = new Route(routes.login, () => new TestBlock(), {
      rootQuery: ROOT_QUERY,
      authRequired: false,
    });
    expect(route.match('/')).toBe(true);
    expect(route.match('/login')).toBe(false);
  });

  test('match returns true for wildcard "*"', () => {
    const route = new Route('*', () => new TestBlock(), {
      rootQuery: ROOT_QUERY,
      authRequired: false,
    });
    expect(route.match('/any')).toBe(true);
    expect(route.match('/another')).toBe(true);
  });

  test('render mounts block and calls dispatchComponentDidMount', () => {
    const dispatchSpy = jest.spyOn(
      TestBlock.prototype,
      'dispatchComponentDidMount'
    );
    const route = new Route(routes.login, () => new TestBlock(), {
      rootQuery: ROOT_QUERY,
      authRequired: false,
    });

    route.render();

    const el = root.firstElementChild;
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el?.textContent).toContain('TestBlock');
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('render replaces previous block if called twice', () => {
    const cdms: string[] = [];
    const cwuSpy = jest.spyOn(
      TestBlock.prototype,
      'dispatchComponentWillUnmount'
    );

    const route = new Route(
      routes.login,
      () => {
        const block = new TestBlock();
        jest
          .spyOn(block, 'dispatchComponentDidMount')
          .mockImplementation(() => {
            cdms.push('CDM');
          });
        return block;
      },
      {
        rootQuery: ROOT_QUERY,
        authRequired: false,
      }
    );

    route.render();
    route.render();

    expect(cdms.length).toBe(2);
    expect(cwuSpy).toHaveBeenCalledTimes(1);
  });

  test('leave unmounts block and removes element', () => {
    const dispatchSpy = jest.spyOn(
      TestBlock.prototype,
      'dispatchComponentWillUnmount'
    );
    const route = new Route(routes.login, () => new TestBlock(), {
      rootQuery: ROOT_QUERY,
      authRequired: false,
    });

    route.render();
    const el = root.firstElementChild;

    route.leave();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(root.firstElementChild).toBeNull();
    expect(el?.isConnected).toBe(false);
  });
});
