import { describe, expect, test } from '@jest/globals';

import { Toast } from './Toast';

describe('Toast component', () => {
  test('renders success toast with message', () => {
    const toast = new Toast({ type: 'success', message: 'Success!' });
    const el = toast.getContent();

    expect(el).toBeInstanceOf(HTMLElement);
    expect(el?.classList.contains('toast')).toBe(true);
    expect(el?.classList.contains('toast_success')).toBe(true);
    expect(el?.textContent).toContain('Success!');
  });

  test('renders error toast with message', () => {
    const toast = new Toast({ type: 'error', message: 'Error!' });
    const el = toast.getContent();

    expect(el?.classList.contains('toast_error')).toBe(true);
    expect(el?.textContent).toContain('Error!');
  });

  test('renders info toast with message', () => {
    const toast = new Toast({ type: 'info', message: 'Information' });
    const el = toast.getContent();

    expect(el?.classList.contains('toast_info')).toBe(true);
    expect(el?.textContent).toContain('Information');
  });

  test('getContent returns the same element instance on multiple calls', () => {
    const toast = new Toast({ type: 'success', message: 'Test' });
    const firstEl = toast.getContent();
    const secondEl = toast.getContent();

    expect(firstEl).toBe(secondEl);
  });
});
