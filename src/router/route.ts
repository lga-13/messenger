import Block from '../components/base/block.ts';
import render from '../utils/render.ts';
import isEqual from "../utils/isEqual.ts";


export interface IRoute<P>{
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
    // Скрытие блока
    if (this._block) {
      // Если блок существует и был отрендерен то скроем его
      this._block.hide();
    }
  }

  match(pathname: string) {

    return isEqual(pathname, this._pathname);
  }

  render() {
    // Рендер конкретного блока
    if (!this._block) {

      // Если до этого блок не был установлен
      this._block = new this._blockClass(this._props.blockProps);

      // С помощью утилиты render отрендерим на старницу
      render(this._props.rootQuery, this._block);
      return;
    }
    this._block.show();
  }
}

export default Route;
