import EventBus from "../../components/base/event-bus.ts";

export enum StoreEvents {
    Updated = 'updated',
}

interface Indexed {
    [key: string]: unknown;
}



class Store extends EventBus {
    private state: Indexed = {};

    public getState(): Indexed {
        return this.state;
    }

    public set(path: string, value: unknown): void {
        this.state[path] = value;
        this.emit(StoreEvents.Updated);
    };
}


class UserController {
    public getUser() {
        UserAPI.getUser()
            .then(data => store.set('user', data);
    }
}

export default new Store();