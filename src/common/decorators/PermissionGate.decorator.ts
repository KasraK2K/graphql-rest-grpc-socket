/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import { IAdmin, ITokenPayload, IUser } from '../interfaces'
import { UserType } from '../enums/general.enum'
import { knex } from '../../bootstrap'
/* -------------------------------------------------------------------------- */

const PermissionGate = (permissions: number[]) => {
    return (_target: unknown, _prototypeKey: string, descriptor: PropertyDescriptor) => {
        const originalValue = descriptor.value

        descriptor.value = async (...args: any[]) => {
            const req = args[2].req
            const token_payload: ITokenPayload = req.token_payload
            const user: IUser[] | IAdmin[] =
                token_payload.user_type === UserType.USER
                    ? await knex<IUser>('users').where({ id: token_payload.id }).returning('*')
                    : await knex<IAdmin>('admins').where({ id: token_payload.id }).returning('*')

            // get all roles
            // get all permissions
            // check is user.permissions in permissions

            return originalValue.apply(this, args)
        }
    }
}

export default PermissionGate
