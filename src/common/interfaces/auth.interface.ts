/* ----------------------------- Custom Modules ----------------------------- */
import { IUser, IAdmin } from '.'
/* -------------------------------------------------------------------------- */

export interface IAuthResponse {
    token: string
    entity: IUser | IAdmin
}
