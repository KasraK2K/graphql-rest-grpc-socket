/* ----------------------------- Custom Modules ----------------------------- */
import { UserType } from './../common/enums/general.enum'
import { ITokenPayload } from '../common/interfaces/general.interface'
import { IUser } from '../common/interfaces/user.interface'
import { IAdmin } from '../common/interfaces/admin.interface'
import { knex } from '../bootstrap'
/* -------------------------------------------------------------------------- */

export interface IContext {
    token?: string
    cacheKey?: string
    token_payload?: ITokenPayload
    user: IUser | IAdmin

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
    user: Object.create(null),
    dataSource: { knex }
}
