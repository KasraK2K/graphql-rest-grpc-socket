import { TokenType, UserType } from '../enums/general.enum'

export interface IDefaultArgs {
    [key: string]: any
}

export interface IPagination {
    limit: number
    page: number
    filter?: IFilter
}

export interface IFilter {
    where?: { field: string; operator: string; value: string }[]
    group?: string[]
    order?: string[]
    is_asc?: boolean
    limit?: number
    page?: number
}

export interface IFile {
    size: number
    filepath: string
    newFilename: string
    mimetype: string
    mtime: string
    originalFilename: string
}

export interface ITokenPayload {
    id: number
    user_type: UserType
    token_type: TokenType
}
