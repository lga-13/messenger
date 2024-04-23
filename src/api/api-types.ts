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

export interface UserProfileUpdateDataType {
    first_name?: string;
    second_name?: string;
    display_name?: string;
    login?: string;
    email?: string;
    phone?: string;
}

export interface UserAvatarUpdateDataType {
    avatar: File;
}

export interface UserPasswordUpdateDataType {
    oldPassword: string;
    newPassword: string;
}

export interface UserSearchDataType {
    login: string;
}