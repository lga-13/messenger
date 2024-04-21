import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";


const chatAPIInstance = new HTTP(HTTP.prefixes.HTTPS, "ya-praktikum.tech", 80, '/api/v2/chats');


class ChatAPI extends BaseAPI {

    request() {
        chatAPIInstance.get('/', {id: "1"}, {id: "1"})
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    create() {
        chatAPIInstance.post('/', {id: "1"}, {id: "1"})
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    delete() {
        chatAPIInstance.delete('/', {id: "1"})
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }
}

let chatApi = new ChatAPI()
console.log(chatApi.request())
console.log(chatApi.create())
console.log(chatApi.delete())