/* ------------------------------ Dependencies ------------------------------ */
import { Request } from 'express'
import config from 'config'
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import errorHandler from '../helpers/errors/error.handler'
/* -------------------------------------------------------------------------- */

const bearerKey: string = config.get('application.bearer')
const bearerHeader: string = config.get('application.bearerHeader')

const Role = (roles: string[]) => {
    return (_target: unknown, _prototypeKey: string, descriptor: PropertyDescriptor) => {
        const originalValue = descriptor.value

        descriptor.value = function (...args: any[]) {
            const rawHeaders = args[2].req.rawHeaders
            const headers: string[] = Array.from(rawHeaders)
            let token: string | string[] = headers.filter((header) => header.startsWith(bearerKey))

            // Check Authorization Header
            if (!token || !token.length || !headers.includes(bearerHeader)) throw errorHandler(401)
            // Check Token & Role
            else {
                token = token[0].slice(bearerKey.length + 1)
                const tokenRole = 'user' // FIXME : Extract from token
                // Check role is valid
                if (!roles.includes(tokenRole)) throw errorHandler(403)
            }

            return originalValue.apply(this, args)
        }
    }
}

export default Role
