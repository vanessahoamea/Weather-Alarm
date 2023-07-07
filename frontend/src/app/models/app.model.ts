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
    weather?: string;
}

export interface Weather {
    location: string;
    country: string;
    temperature: number;
    condition: string;
    iconUrl: string;
    wind: number;
    humidity: number;
    uvIndex: number;
}

export interface Response {
    message: string;
    data: object;
}