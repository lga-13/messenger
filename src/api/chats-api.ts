import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {
    ArchiveChatDataType,
    ArchiveChatsGetDataType, AvatarChatDataType,
    ChatCreateDataType,
    ChatsGetDataType,
    DeleteChatDataType, UnarchiveChatDataType
} from "./api-types.ts";


const chatsAPIPath = `${BASE_PATH}/chats`
const chatsArchiveAPIPath = `${chatsAPIPath}/archive`
const chatsUnarchiveAPIPath = `${chatsAPIPath}/unarchive`
const chatsAvatarAPIPath = `${chatsAPIPath}/avatar`


const chatAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsAPIPath);
const chatArchiveAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsArchiveAPIPath);
const chatUnarchiveAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsUnarchiveAPIPath);
const chatAvatarAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, chatsAvatarAPIPath);


export class ChatsApi extends BaseAPI {

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

    delete(data: DeleteChatDataType) {
        chatAPIInstance.delete(
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
        chatArchiveAPIInstance.post(
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
        chatArchiveAPIInstance.get(
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
        chatUnarchiveAPIInstance.post(
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