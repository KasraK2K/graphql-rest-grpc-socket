export interface IAdmin {
    id: number
    uid: string

    first_name: string
    surname: string
    contact_number: string

    email: string
    password: string

    is_active: boolean
    is_block: boolean
    is_archive: boolean
    roles: string[]

    created_at: string
    updated_at: string
    archived_at: string | null
}

export interface IAdminLoginArgs {
    email: string
    is_block?: boolean
    is_archive?: boolean
}
