import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {
    ArchiveChatDataType,
    ArchiveChatsGetDataType, AvatarChatDataType,
    ChatCreateDataType,
    ChatsGetDataType, ChatUsersGetDataType,
    DeleteChatDataType, UnarchiveChatDataType
} from "./api-types.ts";
import {data} from "autoprefixer";
import {c} from "vite/dist/node/types.d-aGj9QkWt";


const chatsAPIPath = `${BASE_PATH}/chats`
const chatsArchiveAPIPath = `${chatsAPIPath}/archive`
const chatsUnarchiveAPIPath = `${chatsAPIPath}/unarchive`
const chatsAvatarAPIPath = `${chatsAPIPath}/avatar`


const chatAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsAPIPath);
const chatArchiveAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsArchiveAPIPath);
const chatUnarchiveAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsUnarchiveAPIPath);
const chatUserAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsAPIPath);


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
            }
        )
            .catch(error => {throw error});
    }
}

export class ChatsArchiveApi extends BaseAPI {

    create(data: ArchiveChatDataType) {
        return chatArchiveAPIInstance.post(
            "/",
            {},
            {},
            {
                "chatId": data.chatId,
            }
        )
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }

    request(data: ArchiveChatsGetDataType) {
        return chatArchiveAPIInstance.get(
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
}


export class ChatsUnarchiveApi extends BaseAPI {

    create(data: UnarchiveChatDataType) {
        return chatUnarchiveAPIInstance.post(
            "/",
            {},
            {},
            {
                "chatId": data.chatId,
            }
        )
            .then(get_result => {return get_result})
            .catch(error => {throw error});
    }
}


export class ChatUsersApi extends BaseAPI {

    request(data: ChatUsersGetDataType) {
        return chatUserAPIInstance.get(
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
}

const chatsApiInstance = new  ChatsApi();
const chatUserApi = new ChatUsersApi()
// console.log(await chatsApiInstance.create({
//     title: "test"
// }));
console.log(await chatsApiInstance.request(
    {
        "limit": "10", "offset": "0", "title": ""
    }
))
console.log(await chatUserApi.request({
    id: 2968,
    limit: "10",
    offset: "0",
    name: "",
    email: ""
    }
))