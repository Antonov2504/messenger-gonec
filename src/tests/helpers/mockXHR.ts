type XHRMockConfig = Partial<{
  status: number;
  response: unknown;
  responseText: string;
  withCredentials: boolean;
  timeout: number;
  responseType: XMLHttpRequestResponseType;
}>;

export const mockXHR = (config: XHRMockConfig = {}) => {
  const sendMock = jest.fn();
  const openMock = jest.fn();
  const setRequestHeaderMock = jest.fn();

  const xhrMock = {
    open: openMock,
    send: sendMock,
    setRequestHeader: setRequestHeaderMock,
    status: config.status ?? 200,
    response: config.response ?? {},
    responseText: config.responseText ?? '',
    withCredentials: config.withCredentials ?? false,
    timeout: config.timeout ?? 0,
    responseType: config.responseType ?? 'json',
    onload: jest.fn(),
    onerror: jest.fn(),
    onabort: jest.fn(),
    ontimeout: jest.fn(),
  };

  // @ts-expect-error меняем глобальный XMLHttpRequest
  global.XMLHttpRequest = jest.fn(() => xhrMock);

  return { xhrMock, openMock, sendMock, setRequestHeaderMock };
};
