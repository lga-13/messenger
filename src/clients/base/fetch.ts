export default class APIClient {
  static request(method, url, body = null, params = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let constructedURL = url;

      // Handling params for GET request
      if (method === 'GET' && params) {
        const queryParams = new URLSearchParams(params).toString();
        constructedURL = `${url}?${queryParams}`;
      }

      xhr.open(method, constructedURL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(JSON.parse(xhr.response));
        }
      };

      xhr.onerror = () => {
        reject(xhr.response);
      };

      // Handling body for POST, PUT, DELETE requests
      if (body && method !== 'GET') {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }

  static get(url, params) {
    return APIClient.request('GET', url, null, params);
  }

  static post(url, body) {
    return APIClient.request('POST', url, body);
  }

  static put(url, body) {
    return APIClient.request('PUT', url, body);
  }

  static delete(url, body) {
    return APIClient.request('DELETE', url, body);
  }
}
