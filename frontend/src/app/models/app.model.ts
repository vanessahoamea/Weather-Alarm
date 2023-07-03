export interface User {
    id: string;
    email: string;
    password: string;
}

export interface Response {
    message: string;
    data: object;
}