import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {SignInDataType, SignUpDataType} from "./api-types.ts";
import {API_DOMAIN, BASE_PATH} from "../../settings.ts";
import {c} from "vite/dist/node/types.d-aGj9QkWt";


const authAPIPath = `${BASE_PATH}/auth`


const authAPIInstance = new HTTP(HTTP.prefixes.HTTPS, API_DOMAIN, 80, authAPIPath);


class SignUpAPI extends BaseAPI {

    create(data: SignUpDataType) {
        return authAPIInstance.post(
            '/signup',
            {},
            {},
            {
                "first_name": data.first_name,
                "second_name": data.second_name,
                "login": data.login,
                "email": data.email,
                "password": data.password,
                "phone": data.phone
            },
            true
        )
            .then(get_result => {
                return get_result
            })
            .catch(error => {
                throw error
            });
    }
}


class SignInAPI extends BaseAPI {
    create(data: SignInDataType) {
        return authAPIInstance.post(
            '/signin',
            {},
            {},
            {
                "login": data.login,
                "password": data.password
            },
            true
        )
            .then(get_result => {
                return get_result
            })
            .catch(error => {
                throw error
            });
    }
}


class UserAPI extends BaseAPI {
    request() {
        return authAPIInstance.get(
            '/user',
            {},
            {},
            {},
            true,
        )
            .then(get_result => {
                return get_result
            })
            .catch(error => {
                throw error
            });
    }
}


class LogoutAPI extends BaseAPI {
    create() {
        return authAPIInstance.post(
            '/logout',
            {},
            {},
            {},
            true
        )
            .then(get_result => {
                return get_result
            })
            .catch(error => {
                throw error
            });
    }
}


const userApiInstance = new UserAPI();
const logoutApiInstance = new LogoutAPI();
const loginApiInstance = new SignInAPI();
const signupApiInstance = new SignUpAPI();

// signupApiInstance.create({
//     first_name: "Gleb",
//     second_name: "Lazarev",
//     login: "glazarev",
//     email: "gl@gl.ru",
//     password: "admin",
//     phone: "88005553535"
// })

console.log(await userApiInstance.request())