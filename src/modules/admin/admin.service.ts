/* ------------------------------ Dependencies ------------------------------ */
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import adminRepository from './admin.repository'
import { IAdmin, IAdminLoginArgs, ITokenPayload } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import { IContext } from '../../graphql/context'
import errorHandler from '../../common/helpers/errors/error.handler'
import tokenHelper from '../../common/helpers/token.helper'
import { UserType } from '../../common/enums/general.enum'
import { IApplicationConfig } from '../../../config/config.interface'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')

class AdminService {
    async getAdmin(args: IAdminLoginArgs): Promise<IAdmin> {
        args.email = args.email.toLowerCase()
        return await adminRepository.getAdmin(args)
    }

    async addAdmin(context: IContext, args: { email: string; password: string }): Promise<IAdmin> {
        const { data } = this.checkToken(context)

        if (data.user_type !== UserType.ADMIN) throw errorHandler(403)
        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        return await adminRepository.addAdmin(args)
    }

    private checkToken(context: IContext): { token: string; data: ITokenPayload } {
        const authorization = context.request.headers.get(applicationConfig.bearerHeader)
        if (authorization) {
            const token = authorization.slice(applicationConfig.bearer.length + 1)
            const { valid, data } = tokenHelper.verify(token)
            if (!valid) throw errorHandler(403)
            else return { token, data }
        } else throw errorHandler(401)
    }
}

export default new AdminService()
