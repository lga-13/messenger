import { IRoute } from 'express';
import Route from './route.ts';
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
    const route = new Route(pathname, block, props);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      if (event) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route| undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
