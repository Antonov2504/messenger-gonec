import { ApiError } from './ApiError';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type MethodOptions = {
  headers?: Record<string, string>;
  data?: RequestData;
  timeout?: number;
};

type RequestData = Record<string, unknown> | FormData | string;

export type RequestOptions = {
  method: HTTPMethod;
  headers?: Record<string, string>;
  data?: RequestData;
  withCredentials?: boolean;
  responseType?: XMLHttpRequestResponseType;
};

type HTTPRequestMethod = <T = XMLHttpRequest>(
  url: string,
  options?: MethodOptions
) => Promise<T>;

const METHODS: Record<HTTPMethod, HTTPMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const queryStringify = (data?: Record<string, unknown>) => {
  if (!data) {
    return '';
  }

  if (typeof data !== 'object') {
    throw new Error('data must be an object!');
  }

  if (!Object.keys(data).length) {
    return '';
  }

  const queries = Object.entries(data).map(
    ([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
  );
  return `?${queries.join('&')}`;
};

export class HTTPTransport {
  get: HTTPRequestMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post: HTTPRequestMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put: HTTPRequestMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete: HTTPRequestMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  private request = <T = XMLHttpRequest>(
    url: string,
    options: RequestOptions,
    timeout = 5000
  ): Promise<T> => {
    const {
      method,
      headers = {},
      data,
      withCredentials = true,
      responseType = 'json',
    } = options;

    return new Promise<T>((res, rej) => {
      if (!method) {
        rej('Не указан метод запроса');
        return;
      }

      const isGet = method === METHODS.GET;

      const xhr = new XMLHttpRequest();

      xhr.open(
        method,
        isGet ? `${url}${queryStringify(data as Record<string, unknown>)}` : url
      );

      Object.entries(headers).forEach(([key, value]) =>
        xhr.setRequestHeader(key, value)
      );

      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;
      xhr.timeout = timeout;

      xhr.onload = () => {
        const status = xhr.status;

        if (status >= 200 && status < 300) {
          res(xhr.response as T);
        } else {
          const reason = this.parseError(xhr);
          rej(new ApiError(status, reason));
        }
      };

      xhr.onerror = () => rej(new ApiError(0, 'Network error'));
      xhr.onabort = () => rej(new ApiError(0, 'Request aborted'));
      xhr.ontimeout = () => rej(new ApiError(0, 'Request timeout'));

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData || typeof data === 'string') {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };

  private parseError(xhr: XMLHttpRequest): string {
    try {
      if (xhr.response && typeof xhr.response === 'object') {
        return (xhr.response as ApiError).reason || 'Ошибка сервера';
      }

      const data = JSON.parse(xhr.responseText);
      return data.reason || 'Ошибка сервера';
    } catch {
      return 'Ошибка сервера';
    }
  }
}
