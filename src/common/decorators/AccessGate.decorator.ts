/* ----------------------------- Custom Modules ----------------------------- */
import { UserType } from '../enums/general.enum'
import { knex } from '../../bootstrap'
import errorHandler from '../helpers/errors/error.handler'
import { IAdminApplicant, IApplicant, IUserApplicant } from '../interfaces/applicant.interface'
import { IContext } from '../../graphql/context'
import { TypeGate } from '.'
/* -------------------------------------------------------------------------- */

/**
 * Check applicant access and add applicant to request
 *
 * @param {number[]} accesses
 */
const AccessGate = (accesses: number[]) => {
    return (_target: unknown, _prototypeKey: string, descriptor: PropertyDescriptor) => {
        const originalValue = descriptor.value

        descriptor.value = async (...args: any[]) => {
            // Quite function if doesn't have accesses
            if (!accesses.length) return originalValue.apply(this, args)

            const context: IContext = args[2]
            const req = context.req

            // If TypeGate not used
            if (!('token_payload' in context))
                return errorHandler(500, `Before use AccessGate, use ${TypeGate.name} decorator`)

            const token_payload = context.token_payload
            const isAdmin = token_payload.user_type === UserType.ADMIN
            const api = isAdmin ? knex<IAdminApplicant>('admins') : knex<IUserApplicant>('users')

            // If applicant with this token.id not found
            const applicants: IApplicant[] = await api
                .where({ id: token_payload.id })
                .limit(1)
                .returning('*')
            if (!applicants || !applicants.length) throw errorHandler(401)
            const applicant = applicants[0]

            // If is superuser admin do not check access
            if (isAdmin && 'is_superuser' in applicant && applicant.is_superuser)
                return originalValue.apply(this, args)

            // If applicant.roles is empty
            if (!applicant.roles.length) throw errorHandler(403)

            const permissionsQuery = /* SQL */ `
                SELECT DISTINCT p.access
                FROM "users" u
                JOIN "roles" r ON u.roles @> ARRAY[r.id]
                JOIN "permissions" p ON r.permissions @> ARRAY[p.id]
                WHERE u.id = ${token_payload.id};`

            await knex
                .raw(permissionsQuery)
                .then((result) => {
                    if (!result.rowCount) throw errorHandler(403)
                    else {
                        const foundedAccesses: number[] = result.rows.map(
                            (item: { access: number }) => item.access
                        )
                        for (const access of accesses) {
                            if (foundedAccesses.includes(access)) {
                                // Add type and permissions to applicant
                                applicant.type = token_payload.user_type
                                applicant.accesses = foundedAccesses
                                // Add applicant to request
                                req.applicant = applicant
                                return
                            }
                        }
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

export default AccessGate
