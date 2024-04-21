import HTTP from "../modules/http/http.ts";
import {BaseAPI} from "./base-api.ts";
import {SignInData, SignUpData} from "./api-types.ts";


const authAPIInstance = new HTTP(HTTP.prefixes.HTTPS, "ya-praktikum.tech", 80, '/api/v2/auth');


class SignUpAPI extends BaseAPI {

    create(data: SignUpData) {
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
    create(data: SignInData) {
        return authAPIInstance.post(
            '/signin',
            {},
            {},
            {
                "login": data.login,
                "password": data.password
            }
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
    create(data: SignInData) {
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