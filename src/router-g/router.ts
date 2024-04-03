import Route, {IRoute} from './route.ts';
import Block from '../components/base/block.ts';

class Router {

  static __instance: Router | null;

  routes: Route[];

  history: History;

  _currentRoute: Route | null;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    if (Router.__instance) {
      return Router.__instance;
    }
    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, props: IRoute) {
    // Регистрация роута
    // Добавим в пул роутов новый роут
    const route = new Route(pathname, block, props);
    this.routes.push(route);
    return this;
  }

  start() {
    // Запуск роутера
    window.onpopstate = (event) => {
      if (event) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    // Загрузка пути
    const route = this.getRoute(pathname);

    // Еслм такой роут НЕ найден
    if (!route) {

      // Метод ничего не сделет
      return;
    }

    // Если есть текущий роут
    if (this._currentRoute) {

      // Скроем его
      this._currentRoute.leave();
    }

    // Рендерим
    route.render();
  }

  go(pathname: string) {
    // Внешний метод загрузки пути
    this.history.pushState({}, '', pathname);

    // Вызов внутренненго метода загрузки пути
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route| undefined {
    // Проверка существования пути pathname
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
