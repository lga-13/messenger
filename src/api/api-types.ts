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

export interface DeleteChatDataType {
    chatId: string,
}

export interface ArchiveChatDataType {
    chatId: string,
}

export interface ArchiveChatsGetDataType {
    offset: string,
    limit: string,
    title: string,
}

export interface UnarchiveChatDataType {
    chatId: string,
}

export interface AvatarChatDataType {
    chatId: string,
}

export interface ChatUsersGetDataType {
    id: string,
    offset: string,
    limit: string,
    name: string,
    email: string
}

export interface AddDeleteUserFromChat{
    users: number[],
    chatId: number
}