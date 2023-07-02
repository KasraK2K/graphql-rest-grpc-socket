/* ----------------------------- Custom Modules ----------------------------- */
import { UserType } from './../common/enums/general.enum'
import { ITokenPayload } from '../common/interfaces/general.interface'
import { IUser } from '../common/interfaces/user.interface'
/* -------------------------------------------------------------------------- */

interface ContextUser extends IUser {
    type: UserType.USER
}
interface ContextAdmin extends IUser {
    type: UserType.ADMIN
}

export interface IContext {
    token?: string
    cacheKey?: string
    token_payload?: ITokenPayload
    user: ContextUser | ContextAdmin

    dataSource: Record<string, any>

    req: Record<string, any>
    res: Record<string, any>
    waitUntil: Record<string, any>
    request: Record<string, any>
    params: Record<string, any>
}

export const context: Partial<IContext> = {
    user: Object.create(null),
    dataSource: {}
}
