import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {
    AddDeleteUserFromChat,
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

    delete(data: AddDeleteUserFromChat) {
        return chatAPIInstance.delete(
            '/users',
            {},
            {},
            {
                "users": data.users,
                "chatId": data.chatId
            },
            true
        )
            .catch(error => {throw error});
    }

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

    replace(data: AddDeleteUserFromChat) {
        return chatAPIInstance.put(
            "users",
            {},
            {},
            {
                "users": data.users,
                "chatId": data.chatId
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
await chatUserApi.replace({users: [200], chatId: 2968})
console.log(await chatUserApi.request({
    id: 2968,
    limit: "10",
    offset: "0",
    name: "",
    email: ""
    }
))
await chatUserApi.delete({users: [200], chatId: 2968})
console.log(await chatUserApi.request({
        id: 2968,
        limit: "10",
        offset: "0",
        name: "",
        email: ""
    }
))