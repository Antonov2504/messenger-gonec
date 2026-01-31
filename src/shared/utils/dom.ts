export const isScrolledToBottom = (
  element: HTMLElement,
  offset = 20
): boolean => {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return scrollHeight - (scrollTop + clientHeight) <= offset;
};
