/* ----------------------------- Custom Modules ----------------------------- */
import adminRepository from './admin.repository'
import { IAdmin } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import { IContext } from '../../graphql/context'
import errorHandler from '../../common/helpers/errors/error.handler'
import tokenHelper from '../../common/helpers/token.helper'
import { UserType } from '../../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

class AdminService {
    async getAdmin(args: { email: string }): Promise<IAdmin> {
        args.email = args.email.toLowerCase()
        return await adminRepository.getAdmin(args)
    }

    async addAdmin(context: IContext, args: { email: string; password: string }): Promise<IAdmin> {
        if (!context.token) throw errorHandler(401)
        const { valid, data } = tokenHelper.verify(context.token)
        if (!valid) throw errorHandler(403)
        if (data.user_type !== UserType.ADMIN) throw errorHandler(403)

        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        return await adminRepository.addAdmin(args)
    }
}

export default new AdminService()
