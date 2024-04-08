import Block from "../components/base/block.ts";
import isEqual from "../utils/isEqual.ts";
import render from '../utils/render.ts';


export interface IRoute<P>{
    blockProps: P,
    rootQuery: string
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
        // Метод который рендерит текущий блок и меняет путь
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        // Удаление блока из DOM
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        // Сравнение передаавемого пути с текущим
        return isEqual(pathname, this._pathname);
    }

    render() {
        // Рендер блока принадлежащего роуту
        if (!this._block) {
            console.log("Ренер блока", this._blockClass)
            this._block = new this._blockClass(this._props.blockProps);
            render(this._props.rootQuery, this._block);
            return;
        }
        this._block.show();
    }
}

export default Route;