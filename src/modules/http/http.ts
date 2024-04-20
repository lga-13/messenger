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

    constructor(prefix: HttpPrefixes, host: string, port: number) {
        this.host = prefix + "://" + host + ":" + port;

    }

    private onLoad(xhrObject: XMLHttpRequest): string{
        if (xhrObject.status === 200) {
            return xhrObject.responseText
        } else {
            return `Ответ от сервера: ${xhrObject.status} | ${xhrObject.statusText}`
        }
    }

    private request(method: HttpRequestMethods, path: string, queryParams: Record<string, string>, headers: Record<string, string> = {}, body?: Object): Promise<any> {
        let request = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            let queryString = new URLSearchParams(queryParams).toString();
            let url = this.host + path + (queryString? "?" + queryString: "");
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
        return this.request(HttpRequestMethods.GET, path, queryParams);
    }

    delete(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}): Promise<string> {
        return this.request(HttpRequestMethods.DELETE, path, queryParams);
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
request.get('/', {id: "1"})
    .then(get_result => console.log(get_result))
    .catch(error => console.log(error));

request.delete('/', {id: "1"})
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