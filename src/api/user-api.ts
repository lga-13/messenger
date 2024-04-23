import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {
    UserProfileUpdateDataType,
    UserAvatarUpdateDataType,
    UserPasswordUpdateDataType,
    UserSearchDataType
} from "./api-types.ts";
import * as http from "node:http";

const userAPIPath = `${BASE_PATH}/user`

const userAPIInstance = new HTTP(HTTP.prefixes.HTTP, API_DOMAIN, 80, userAPIPath);


class UserApi extends BaseAPI {

    getRootData(headers: object) {
        return userAPIInstance.get(
            '/',
            {},
            headers
        )
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    getUserData() {
        return userAPIInstance.get(
            '/profile',
            {},
            {}
        )
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

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
            {withCredentials: true},
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
                "newPassword": data.newPassword,
                withCredentials: true
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
const userApi = new UserApi();

// Обновление пароля пользователя
// const passwordData: UserPasswordUpdateDataType = {
//     oldPassword: 'oldPassword',
//     newPassword: 'newPassword'
// };
// userApi.updatePassword(passwordData)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// Поиск пользователей
// const searchData: UserSearchDataType = {
//     login: 'user1'
// };
//
// userApi.searchUsers(searchData)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// const avatarData: UserAvatarUpdateDataType = new FormData();
// avatarData.append('avatar', 'file');
//
// userApi.updateAvatar(avatarData)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.error(error);
//     });



userApi.getRootData({
    'accept': '*/*',
    'cache-control': 'no-cache',
    'postman-token': 'd9f7e48c-d074-4259-9c90-f2284501ed85'
})
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });

// userApi.getUserData()
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// const data: UserProfileUpdateDataType = {
//     first_name: 'Иван',
//     second_name: 'Иванов',
//     display_name: 'Иван Иванов',
//     login: 'ivanov',
//     email: 'ivanov@example.com',
//     phone: '+79998887766'
// };

// userApi.updateProfile(data)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.error(error);
//     });