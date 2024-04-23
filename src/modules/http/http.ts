import stripSlash from "../../utils/stripSlashAndSpase.ts";
import {
    BadRequestError,
    ForbiddenHttpError,
    MethodNotAllowedHttpError,
    NonAuthorizedHttpError,
    NotFoundHttpError, RequestServerDataConflictError, ServerError
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
        this.host = HTTP.constructBasePath(prefix, host, port, base_path);
    }

    static constructBasePath(prefix: HttpPrefixes, host: string, port: number, base_path: string | null = null) {
        let result = stripSlash(prefix) + "://" + stripSlash(host)
        if (port != 80) {
            result += ":" + port
        }

        if(base_path)  {
            result += "/"
            result += stripSlash(base_path) + "/";
        }
        return result;

    }

    private constructUrl(path: string, queryParams: Record<string, string>): string {
        let queryString = new URLSearchParams(queryParams).toString();
        let firstSlash = "/"
        if (path === "/" || !queryParams) {
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
            throw new BadRequestError("Неверный запрос. Причина ошибки: " + xhrObject.responseText)
        } else if (xhrObject.status === 401) {
            throw new NonAuthorizedHttpError("Не авторизованы. Причина ошибки: " + xhrObject.responseText)
        } else if (xhrObject.status === 403){
            throw new ForbiddenHttpError("Нет доступа. Причина ошибки: " + xhrObject.responseText);
        } else if (xhrObject.status === 404){
            throw new NotFoundHttpError("Не найдено. Причина ошибки: " + xhrObject.responseText);
        } else if (xhrObject.status === 405){
            throw new MethodNotAllowedHttpError("Метод не разрешен. Причина ошибки: " + xhrObject.responseText);
        } else if (xhrObject.status === 409){
            throw new RequestServerDataConflictError("Конфликут запроса и данных на сервере. Причина ошибки: " + xhrObject.responseText)
        } else if (xhrObject.status === 500){
            throw new ServerError("Ошибка сервера.");
        } else {
            throw new Error("Неизвестная ошибка. Код ответа: " + xhrObject.status);
        }
    }

    private request(method: HttpRequestMethods, path: string, queryParams: Record<string, string>, headers: Record<string, string>, body?: Object, withCredentials?: boolean): Promise<any> {
        let request = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            let url = this.constructUrl(path, queryParams);
            request.open(method, url);
            request.withCredentials = withCredentials || false;
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

    get(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}, body: Record<string, string> = {}, withCredentials?: boolean): Promise<string> {
        return this.request(HttpRequestMethods.GET, path, queryParams, headers, body, withCredentials);
    }

    delete(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}, body: Record<string, string> = {}, withCredentials?: boolean): Promise<string> {
        return this.request(HttpRequestMethods.DELETE, path, queryParams, headers, body, withCredentials);
    }

    post(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}, body: Record<string, string> = {}, withCredentials?: boolean): Promise<string> {
        return this.request(HttpRequestMethods.POST, path, queryParams, headers, body, withCredentials);
    }

    put(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}, body: Record<string, string> = {}, withCredentials?: boolean): Promise<string> {
        return this.request(HttpRequestMethods.PUT, path,  queryParams, headers, body, withCredentials);
    }

    patch(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}, body: Record<string, string> = {}, withCredentials?: boolean): Promise<string> {
        return this.request(HttpRequestMethods.PATCH, path, queryParams, headers, body, withCredentials);
    }
}


export default HTTP


const http = new HTTP(HTTP.prefixes.HTTPS, "my-api.com", 443, "/api");

console.log(http.host);