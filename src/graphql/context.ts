/* ----------------------------- Custom Modules ----------------------------- */
import { knex } from '../bootstrap'
/* -------------------------------------------------------------------------- */

export interface IContext {
    cacheKey?: string
    dataSource: {
        knex: typeof knex
    }

    req: Record<string, any>
    res: Record<string, any>
    waitUntil: Record<string, any>
    request: Record<string, any>
    params: Record<string, any>
}

export const context: Partial<IContext> = {
    dataSource: { knex }
}
