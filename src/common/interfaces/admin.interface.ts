export interface IAdmin {
    id: number

    first_name: string
    surname: string
    contact_number: string

    email: string
    password: string
    last_token: string

    is_active: boolean
    is_block: boolean
    is_archive: boolean
    is_superuser: boolean
    roles: string[]

    created_at: string
    updated_at: string
    archived_at: string | null
    last_login_at: string | null
}

export interface IAdminFilterArgs {
    id?: number
    email?: string
    last_token?: string
}

export type IOmittedAdmin = Omit<IAdmin, 'password'>
