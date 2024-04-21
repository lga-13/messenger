import stripSlash from "../../utils/stripSlashAndSpase.ts";
import {
    BadRequestError,
    ForbiddenHttpError,
    MethodNotAllowedHttpError,
    NonAuthorizedHttpError,
    NotFoundHttpError, ServerError
} from "./http-exceptions.ts";

enum HttpRequestMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

enum HttpPrefixes {
    HTTP = "http",
    HTTPS = "https",
}


class HTTP {
    static prefixes = HttpPrefixes;
    host: string;

    constructor(prefix: HttpPrefixes, host: string, port: number, base_path: string | null = null) {
        this.host = stripSlash(prefix) + "://" + stripSlash(host) + ":" + port + "/"
        if(base_path)  {
            this.host += stripSlash(base_path) + "/";
        }
    }

    private constructUrl(path: string, queryParams: Record<string, string>): string {
        let queryString = new URLSearchParams(queryParams).toString();
        let firstSlash = "/"
        if (path === "/") {
            firstSlash = "";
        }
        return  this.host + stripSlash(path) + firstSlash + (queryString? "?" + queryString: "");
    }

    private onLoad(xhrObject: XMLHttpRequest): string{
        if (xhrObject.status === 200) {
            return xhrObject.responseText
        } else if (xhrObject.status === 204) {
            return
        }else if (xhrObject.status === 400) {
            throw new BadRequestError("Неверный запрос.")
        } else if (xhrObject.status === 401) {
            throw new NonAuthorizedHttpError("Не авторизованы.")
        } else if (xhrObject.status === 403){
            throw new ForbiddenHttpError("Нет доступа.");
        } else if (xhrObject.status === 404){
            throw new NotFoundHttpError("Не найдено.");
        } else if (xhrObject.status === 405){
            throw new MethodNotAllowedHttpError("Метод не разрешен.");
        } else if (xhrObject.status === 500){
            throw new ServerError("Ошибка сервера.");
        } else {
            throw new Error("Неизвестная ошибка. Код ответа: " + xhrObject.status);
        }
    }

    private request(method: HttpRequestMethods, path: string, queryParams: Record<string, string>, headers: Record<string, string>, body?: Object): Promise<any> {
        let request = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            let url = this.constructUrl(path, queryParams);
            request.open(method, url);
            for(let headerName in headers) {
                request.setRequestHeader(headerName, headers[headerName]);
            }
            if (body) {
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(body));
            } else {
                request.send();
            }
            request.onload = () => {
                resolve(this.onLoad(request));
            }
            request.onerror = () => {
                reject('There was a network error.');
            };
        });
    }

    get(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}): Promise<string> {
        return this.request(HttpRequestMethods.GET, path, queryParams, headers);
    }

    delete(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}): Promise<string> {
        return this.request(HttpRequestMethods.DELETE, path, queryParams, headers);
    }

    post(path: string, headers: Record<string, string> = {}, body: Record<string, string> = {}): Promise<string> {
        return this.request(HttpRequestMethods.POST, path, {}, headers, body);
    }

    put(path: string, headers: Record<string, string> = {}, body: Record<string, string> = {}): Promise<string> {
        return this.request(HttpRequestMethods.PUT, path, {}, headers, body);
    }

    patch(path: string, headers: Record<string, string> = {}, body: Record<string, string> = {}): Promise<string> {
        return this.request(HttpRequestMethods.PATCH, path, {}, headers, body);
    }
}


export default HTTP


let request = new HTTP(HTTP.prefixes.HTTP, 'localhost', 8000);
request.get('/', {id: "1"}, {id: "1"})
    .then(get_result => console.log(get_result))
    .catch(error => console.log(error));

request.delete('/', {id: "1"}, {id: "1"})
    .then(delete_result => console.log(delete_result))
    .catch(error => console.log(error));

request.post('/', {id: "1"}, {id: "1"})
    .then(post_result => console.log(post_result))
    .catch(error => console.log(error));

request.put('/', {id: "1"}, {id: "1"})
    .then(put_result => console.log(put_result))
    .catch(error => console.log(error));

request.patch('/', {id: "1"}, {id: "1"})
    .then(patch_result => console.log(patch_result))
    .catch(error => console.log(error));