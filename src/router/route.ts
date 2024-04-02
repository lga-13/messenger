import Block from '../components/base/block.ts';
import render from '../utils/render.ts';

function isEqual(str1: string, str2: string): boolean {
  return str1 === str2;
}

interface IRoute<P>{
    rootQuery: string,
    blockProps: P
}

class Route<T extends Block, P> {
  _pathname: string;

  _block: T | null;

  _props: IRoute<P>;

  _blockClass: new (props: P) => T;

  constructor(pathname: string, view: new (props: P) => T, props: IRoute<P>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props.blockProps);
      render(this._props.rootQuery, this._block);
      return;
    }
    this._block.show();
  }
}

export default Route;
