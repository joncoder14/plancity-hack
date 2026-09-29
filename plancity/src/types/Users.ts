type Role = 'user' | 'admin'

export interface User {
    id:string;
    name: string;
    email: string;
    role: Role;
    createdAt: string;
}

export interface UserRegister {
    name:string,
    email:string,
    password:string,
}


export interface UserResponse {
    accessToken: string;
    user: User
}