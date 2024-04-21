export interface SignUpDataType {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string
}


export interface SignInDataType {
    login: string;
    password: string;
}


export interface ChatsGetDataType {
    offset: string,
    limit: string,
    title: string,
}

export interface ChatCreateDataType {
    title: string,
}