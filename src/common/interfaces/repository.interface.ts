export interface IExecuteQueryOptions {
    query: string
    parameters?: any[]
    omits?: string[]
}

export interface IExecuteOptions {
    omits?: string[]
}

export interface IQueryGenerator {
    query: string
    parameters: any[]
}

export interface IPaginate<T> {
    row_count: number
    rows: T[]
    total_count?: number
    total_page?: number
    page?: number
    limit?: number
    nextPage?: number
    prevPage?: number
}

export interface IDefaultResponse<T> {
    row_count: number
    rows: Omit<T[], any>
}
