/* ----------------------------- Custom Modules ----------------------------- */
import { ITokenPayload } from '../common/interfaces/general.interface'
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

    token: string
    token_payload: ITokenPayload
}

export const context: Partial<IContext> = {
    dataSource: { knex }
}
