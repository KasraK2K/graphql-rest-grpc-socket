export interface IUser {
    id: number

    first_name: string
    surname: string
    contact_number: string

    email: string
    password: string
    last_token: string
    verify_token: string

    is_active: boolean
    is_verify: boolean
    is_block: boolean
    is_archive: boolean
    roles: string[]

    created_at: string
    updated_at: string
    archived_at: string | null
    last_login_at: string | null
}

export interface IUserFilterArgs {
    id?: number
    email?: string
    last_token?: string
}

export interface IUserFindArgs {
    id?: number
    email?: string
}

export type IOmittedUser = Omit<IUser, 'password' | 'last_token' | 'verify_token'>
