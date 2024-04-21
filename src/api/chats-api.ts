import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {ChatCreateDataType, ChatsGetDataType} from "./api-types.ts";

const chatsAPIPath = `${BASE_PATH}/chats`

const chatAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsAPIPath);


class ChatsApi extends BaseAPI {

    request(data: ChatsGetDataType) {
        chatAPIInstance.get(
            '/',
            {
                "offset": data.offset,
                "limit": data.limit,
                "title": data.title,
            },
            {}
        )
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    create(data: ChatCreateDataType) {
        chatAPIInstance.post(
            '/',
            {},
            {},
            {
                "title": data.title,
            }
        )
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    delete() {
        chatAPIInstance.delete('/', {}, {}, {})
            .catch(error => {throw error});
    }
}