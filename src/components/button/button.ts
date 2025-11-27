import './button.scss';

export function createButton(
  text: string,
  onClick?: () => void
): HTMLButtonElement {
  const button = document.createElement('button');

  button.className = 'button';
  button.textContent = text;

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}
