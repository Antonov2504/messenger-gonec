type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type MethodOptions = {
  timeout?: number;
};

type RequestData = Record<string, unknown> | FormData | string;

export type RequestOptions = {
  method: HTTPMethod;
  headers?: Record<string, string>;
  data?: RequestData;
};

const METHODS: Record<HTTPMethod, HTTPMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const queryStringify = (data?: Record<string, unknown>) => {
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
  get = (url: string, options: MethodOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: MethodOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: MethodOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: MethodOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options: RequestOptions, timeout = 5000) => {
    const { method, headers = {}, data } = options;

    return new Promise<XMLHttpRequest>((res, rej) => {
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

      xhr.onload = () => {
        res(xhr);
      };

      xhr.onerror = rej;
      xhr.onabort = rej;

      xhr.timeout = timeout;
      xhr.ontimeout = rej;

      if (isGet || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData || typeof data === 'string') {
          xhr.send(data);
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}
