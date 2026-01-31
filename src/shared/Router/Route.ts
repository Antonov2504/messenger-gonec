import type { Block } from '../Block';

export class Route {
  private _pathname: string;
  private _getBlock: () => Block;
  private _block: Block | null = null;
  private _props: { rootQuery: string; authRequired: boolean };

  constructor(
    pathname: string,
    getBlock: () => Block,
    props: { rootQuery: string; authRequired: boolean }
  ) {
    this._pathname = pathname;
    this._getBlock = getBlock;
    this._props = props;
  }

  get config() {
    return {
      authRequired: this._props.authRequired,
    };
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

    if (this._block) {
      this.leave();
    }

    this._block = this._getBlock();
    const content = this._block.getContent();

    if (content) {
      root.replaceChildren(content);
      this._block.dispatchComponentDidMount();
    }
  }

  leave() {
    if (!this._block) {
      return;
    }

    this._block.dispatchComponentWillUnmount();
    this._block.getContent()?.remove();
    this._block = null;
  }
}
