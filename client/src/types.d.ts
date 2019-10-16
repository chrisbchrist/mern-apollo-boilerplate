
export interface AuthUser {
    _id: string,
    email: string
}

export interface UserInfo {
    name: string;
    title: string;
    profilePhoto: string;
    location: string;
    about: string;
    email: string;
    phone: string;
    github: string;
}

export interface UserStyles {
    theme: string;
    color: string;
    font: string;
    fontSize: number;
    bgPhoto: string;
    gradient: Gradient
}

type Gradient = {
    name: string;
    colors: string[];
    direction: string;
    opacity: number;
}

export interface Project {
    _id: string;
    user?: string;
    title: string;
    imgUrl: string;
    desc: string;
    demoUrl?: string;
    srcUrl?: string;
    tags: Array<string>;
}

export interface User {
    _id: string;
    info: UserInfo;
}

declare module 'react-redux';