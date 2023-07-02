/* ----------------------------- Custom Modules ----------------------------- */
import { IUser } from './user.interface'
/* -------------------------------------------------------------------------- */

export interface IAuthResponse {
    token: string
    entity: IUser
}
