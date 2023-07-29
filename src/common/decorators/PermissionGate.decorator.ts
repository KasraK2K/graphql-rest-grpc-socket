/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import { IAdmin, ITokenPayload, IUser } from '../interfaces'
import { UserType } from '../enums/general.enum'
import { knex } from '../../bootstrap'
import errorHandler from '../helpers/errors/error.handler'
/* -------------------------------------------------------------------------- */

const PermissionGate = (permissions: number[]) => {
    return (_target: unknown, _prototypeKey: string, descriptor: PropertyDescriptor) => {
        const originalValue = descriptor.value

        descriptor.value = async (...args: any[]) => {
            // Quite function if doesn't have permissions
            if (!permissions.length) return originalValue.apply(this, args)

            const req = args[2].req
            const token_payload: ITokenPayload = req.token_payload
            const isAdmin = token_payload.user_type === UserType.USER
            const api = isAdmin ? knex<IUser>('users') : knex<IAdmin>('admins')

            // If applicant with this token.id not found
            const applicants = await api.where({ id: token_payload.id }).limit(1).returning('*')
            if (!applicants || !applicants.length) throw errorHandler(401)
            const applicant = applicants[0]

            // if applicant.roles is empty
            if (!applicant.roles.length) throw errorHandler(403)

            const permissionsQuery = /* SQL */ `
                SELECT DISTINCT p.id
                FROM "users" u
                JOIN "roles" r ON u.roles @> ARRAY[r.id]
                JOIN "permissions" p ON r.permissions @> ARRAY[p.id]
                WHERE u.id = 2
            `
            await knex
                .raw(permissionsQuery)
                .then((result) => {
                    if (!result.rowCount) throw errorHandler(403)
                    else {
                        const foundedPermissions = result.rows.map(
                            (item: { id: number }) => item.id
                        )
                        for (const permission of permissions)
                            if (foundedPermissions.includes(permission)) return
                        throw errorHandler(403)
                    }
                })
                .catch((err) => {
                    throw errorHandler(500, err.message)
                })

            return originalValue.apply(this, args)
        }
    }
}

export default PermissionGate
