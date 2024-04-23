import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {
    UserProfileUpdateDataType,
    UserAvatarUpdateDataType,
    UserPasswordUpdateDataType,
    UserSearchDataType,
    ChatsGetDataType
} from "./api-types.ts";
import * as http from "node:http";

const userAPIPath = `${BASE_PATH}/user`

const userAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, userAPIPath);
console.log(userAPIInstance.host)

class UserApi extends BaseAPI {

    updateProfile(data: UserProfileUpdateDataType) {
        return userAPIInstance.put(
            '/profile',
            {},
            {},
            {
                "first_name": data.first_name,
                "second_name": data.second_name,
                "display_name": data.display_name,
                "login": data.login,
                "email": data.email,
                "phone": data.phone
            }
        )
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    updateAvatar(data: UserAvatarUpdateDataType) {
        return userAPIInstance.put(
            '/profile/avatar',
            {},
            {},
            data
        )
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    updatePassword(data: UserPasswordUpdateDataType) {
        return userAPIInstance.put(
            '/password',
            {},
            {},
            {
                "oldPassword": data.oldPassword,
                "newPassword": data.newPassword
            }
        )
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    searchUsers(data: UserSearchDataType) {
        return userAPIInstance.post(
            '/search',
            {},
            {},
            {
                "login": data.login
            }
        )
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

}