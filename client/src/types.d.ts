export interface AuthUser {
    _id: string,
    email: string
}

export interface UserInfo {
    name: string;
    profilePhoto: string;
    location: string;
    about: string;
    email: string;
    phone: string;
    github: string;
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