import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {
    ChatCreateDataType,
    ChatsGetDataType,
    ChatUsersGetDataType,
    DeleteChatDataType,
} from "./api-types.ts";


const chatsAPIPath = `${BASE_PATH}/chats`

const chatAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsAPIPath);


export class ChatsApi extends BaseAPI {

    request(data: ChatsGetDataType) {
        return chatAPIInstance.get(
            '/',
            {
                "offset": data.offset,
                "limit": data.limit,
                "title": data.title,
            },
            {},
            {},
            true
        )
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    create(data: ChatCreateDataType) {
        return chatAPIInstance.post(
            '/',
            {},
            {},
            {
                "title": data.title,
            },
            true
        )
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    delete(data: DeleteChatDataType) {
        return chatAPIInstance.delete(
            '/',
            {},
            {},
            {
                "chatId": data.chatId,
            },
            true
        )
            .catch(error => {throw error});
    }
}


export class ChatUsersApi extends BaseAPI {

    request(data: ChatUsersGetDataType) {
        return chatAPIInstance.get(
            `${data.id}/users`,
            {
                "offset": data.offset,
                "limit": data.limit,
                "name": data.name,
                "email": data.email,
            },
            {},
            {},
            true
        )
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    replace() {
        return chatAPIInstance.put(
            "users",
            {},
            {},
            {
                "users": [
                    290
                ],
                "chatId": 2968
            },
            true
        )
    }

}


const chatsApiInstance = new  ChatsApi();
const chatUserApi = new ChatUsersApi()
console.log(await chatsApiInstance.request(
    {
        "limit": "10", "offset": "0", "title": ""
    }
))
await chatUserApi.replace()
console.log(await chatUserApi.request({
    id: 2968,
    limit: "10",
    offset: "0",
    name: "",
    email: ""
    }
))
