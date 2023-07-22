/* ------------------------------ Dependencies ------------------------------ */
// import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import adminRepository from './admin.repository'
import { IAdmin, IAdminLoginArgs, ITokenPayload } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import errorHandler from '../../common/helpers/errors/error.handler'
import { UserType } from '../../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

// const applicationConfig: IApplicationConfig = config.get('application')

class AdminService {
    async getAdmin(args: IAdminLoginArgs): Promise<IAdmin> {
        args.email = args.email.toLowerCase()
        return await adminRepository.getAdmin(args)
    }

    async addAdmin(
        data: ITokenPayload,
        args: { email: string; password: string }
    ): Promise<IAdmin> {
        if (data.user_type !== UserType.ADMIN) throw errorHandler(403)
        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        return await adminRepository.addAdmin(args)
    }

    async updateAdmin(args: Partial<IAdmin>): Promise<IAdmin> {
        return await adminRepository.updateAdmin(args)
    }
}

export default new AdminService()
