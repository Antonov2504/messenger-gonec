import {
  HTTPTransport,
  type RequestOptions,
} from '@/services/api/HTTPTransport';

type FetchWithRetryOptions = RequestOptions & {
  retry?: number;
};

export const fetchWithRetry = (
  url: string,
  options: FetchWithRetryOptions
): Promise<XMLHttpRequest> => {
  const { retry } = options;

  const onError = (err: unknown): Promise<XMLHttpRequest> => {
    console.log(err);
    if (retry) {
      return fetchWithRetry(url, {
        ...options,
        retry: options?.retry ?? 1 - 1,
      });
    } else {
      throw new Error('no more retry');
    }
  };

  const transport = new HTTPTransport();
  return transport.request(url, options).catch(onError);
};
