

export class BadRequestError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "BadRequestError";
    }
}


export class NonAuthorizedHttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "NonAuthorizedHttpError";
    }
}

export class ForbiddenHttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "ForbiddenHttpError";
    }
}


export class NotFoundHttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "NotFoundHttpError";
    }
}

export class MethodNotAllowedHttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "MethodNotAllowedHttpError";
    }
}

export class ServerError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "MethodNotAllowedHttpError";
    }
}