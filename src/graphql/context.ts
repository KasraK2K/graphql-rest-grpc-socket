export interface IContext {
    dataSource: Record<string, any>

    req: Record<string, any>
    res: Record<string, any>
    waitUntil: Record<string, any>
    request: Record<string, any>
    params: Record<string, any>

    token?: string
    cacheKey?: string
}

export const context: Partial<IContext> = {
    dataSource: {}
}
