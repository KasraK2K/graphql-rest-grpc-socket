/* ------------------------------ Dependencies ------------------------------ */
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import errorHandler from '../helpers/errors/error.handler'
import tokenHelper from '../helpers/token.helper'
import { IContext } from './../../graphql/context'
/* -------------------------------------------------------------------------- */

const bearerKey: string = config.get('application.bearer')
const bearerHeader: string = config.get('application.bearerHeader')

/**
 * Check token existence and validate token and add token_payload to req
 *
 * @param {number[]} roles
 */
const TypeGate = (roles: number[]) => {
    return (_target: unknown, _prototypeKey: string, descriptor: PropertyDescriptor) => {
        const originalValue = descriptor.value

        descriptor.value = async (...args: any[]) => {
            // Quite function if doesn't have roles
            if (!roles.length) return originalValue.apply(this, args)

            const context: IContext = args[2]
            const req = context.req
            const headers: string[] = Array.from(req.rawHeaders)
            let token: string | string[] = headers.filter((header) => header.startsWith(bearerKey))

            // Check Authorization Header
            if (!token || !token.length || !headers.includes(bearerHeader)) throw errorHandler(401)
            // Check Token & Role
            else {
                token = token[0].slice(bearerKey.length + 1)
                const { valid, data } = tokenHelper.verify(token)
                if (!valid) throw errorHandler(401)
                const tokenRole = data.user_type

                // Check role is valid
                if (!roles.includes(tokenRole)) throw errorHandler(403)

                context.token = token
                context.token_payload = data
            }

            return originalValue.apply(this, args)
        }
    }
}

export default TypeGate
