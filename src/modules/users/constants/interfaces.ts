export interface IUser {
    id: number
    uid: string
    first_name: string
    surname: string
    email: string
    password: string
    is_active: boolean
    is_verified: boolean
    is_blocked: boolean
    is_admin: boolean
    is_archived: boolean
    roles: string[]
    created_at: string
    updated_at: string
    archived_at: string | null
}

export interface IUserAuthArgs {
    email: string
    password: IUser
}

export interface ILocalUserAuthResponse {
    token: string
    user: IUser
}
