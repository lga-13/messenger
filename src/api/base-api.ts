export class BaseAPI {
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    create(data: Record<string, string>) { throw new Error('Not implemented'); }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }

    replace() { throw new Error('Not implemented'); }
}