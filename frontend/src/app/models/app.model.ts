export interface User {
    id: string;
    email: string;
    password: string;
}

export interface Alarm {
    id: string;
    userId: string;
    title: string;
    latitude: number;
    longitude: number;
    hour: number;
    minutes: number;
}

export interface Response {
    message: string;
    data: object;
}