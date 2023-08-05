/* ----------------------------- Custom Modules ----------------------------- */
import { IOmittedUser, IOmittedAdmin } from '.'
/* -------------------------------------------------------------------------- */

export interface IUserAuthResponse {
    token: string
    user: IOmittedUser
}

export interface IAdminAuthResponse {
    token: string
    admin: IOmittedAdmin
}
