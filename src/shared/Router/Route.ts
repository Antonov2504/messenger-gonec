import type { Block } from '../Block';

export class Route {
  private _pathname: string;
  private _getBlock: () => Block;
  private _block: Block | null = null;
  private _props: { rootQuery: string };

  constructor(
    pathname: string,
    getBlock: () => Block,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname;
    this._getBlock = getBlock;
    this._props = props;
  }

  match(pathname: string) {
    if (this._pathname === '*') return true;
    return pathname === this._pathname;
  }

  render() {
    const root = document.querySelector(this._props.rootQuery);
    if (!root) {
      return;
    }

    this._block = this._getBlock();
    const content = this._block.getContent();

    if (content) {
      root.replaceChildren(content);
      this._block.dispatchComponentDidMount();
    }
  }

  leave() {
    this._block?.dispatchComponentWillUnmount();
    this._block = null;
  }
}
