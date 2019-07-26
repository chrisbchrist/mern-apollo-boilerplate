export interface AuthUser {
    _id: string,
    email: string
}

export interface Project {
    _id: string;
    title: string;
    imgUrl: string;
    desc: string;
    tags: Array<string>;
}