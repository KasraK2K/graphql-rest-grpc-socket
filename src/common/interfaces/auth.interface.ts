/* ----------------------------- Custom Modules ----------------------------- */
import { IUser, IAdmin } from '.'
/* -------------------------------------------------------------------------- */

export interface IUserAuthResponse {
    token: string
    user: IUser
}

export interface IAdminAuthResponse {
    token: string
    admin: IAdmin
}
