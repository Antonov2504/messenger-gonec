import { mockXHR } from '@/tests/helpers/mockXHR';

import { ApiError } from '../ApiError';
import { HTTPTransport } from '../HTTPTransport';

describe('HTTPTransport', () => {
  let http: HTTPTransport;

  beforeEach(() => {
    http = new HTTPTransport();
    jest.clearAllMocks();
  });

  test('GET request resolves with response', async () => {
    const { xhrMock } = mockXHR({ status: 200, response: { ok: true } });

    const promise = http.get('/test');

    xhrMock.onload();

    await expect(promise).resolves.toEqual({ ok: true });
    expect(xhrMock.open).toHaveBeenCalledWith('GET', '/test');
    expect(xhrMock.send).toHaveBeenCalled();
  });

  test('POST request sends JSON body', async () => {
    const { xhrMock, setRequestHeaderMock } = mockXHR({
      status: 201,
      response: { created: true },
    });

    const promise = http.post('/post', { data: { name: 'John' } });
    xhrMock.onload();

    await expect(promise).resolves.toEqual({ created: true });
    expect(xhrMock.open).toHaveBeenCalledWith('POST', '/post');
    expect(setRequestHeaderMock).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify({ name: 'John' }));
  });

  test('PUT request sends JSON body', async () => {
    const { xhrMock } = mockXHR({ status: 200, response: { updated: true } });

    const promise = http.put('/put', { data: { id: 1 } });
    xhrMock.onload();

    await expect(promise).resolves.toEqual({ updated: true });
  });

  test('DELETE request works', async () => {
    const { xhrMock } = mockXHR({ status: 204, response: {} });

    const promise = http.delete('/delete');
    xhrMock.onload();

    await expect(promise).resolves.toEqual({});
  });

  test('rejects with ApiError', async () => {
    const { xhrMock } = mockXHR({
      status: 400,
      response: { reason: 'Bad request' },
    });

    const promise = http.get('/bad');
    xhrMock.onload();

    await expect(promise).rejects.toThrow(ApiError);
    await expect(promise).rejects.toMatchObject({
      status: 400,
      reason: 'Bad request',
    });
  });

  test('rejects on network error', async () => {
    const { xhrMock } = mockXHR();

    const promise = http.get('/error');
    xhrMock.onerror();

    await expect(promise).rejects.toThrow(ApiError);
    await expect(promise).rejects.toMatchObject({ reason: 'Network error' });
  });

  test('rejects on timeout', async () => {
    const { xhrMock } = mockXHR();

    const promise = http.get('/timeout');
    xhrMock.ontimeout();

    await expect(promise).rejects.toThrow(ApiError);
    await expect(promise).rejects.toMatchObject({ reason: 'Request timeout' });
  });

  test('rejects on abort', async () => {
    const { xhrMock } = mockXHR();

    const promise = http.get('/abort');
    xhrMock.onabort();

    await expect(promise).rejects.toThrow(ApiError);
    await expect(promise).rejects.toMatchObject({ reason: 'Request aborted' });
  });

  test('query string is appended for GET', async () => {
    const { xhrMock } = mockXHR({ status: 200, response: {} });

    http.get('/get', { data: { query: 'test', page: 2 } });
    xhrMock.onload();

    expect(xhrMock.open).toHaveBeenCalledWith('GET', '/get?query=test&page=2');
  });
});
