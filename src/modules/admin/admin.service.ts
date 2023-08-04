/* ------------------------------ Dependencies ------------------------------ */
// import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import adminRepository from './admin.repository'
import { IAdmin, IAdminFilterArgs, IAdminLoginArgs } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
/* -------------------------------------------------------------------------- */

// const applicationConfig: IApplicationConfig = config.get('application')

class AdminService {
    async getAdmin(args: IAdminLoginArgs): Promise<IAdmin> {
        args.email = args.email.toLowerCase()
        return await adminRepository.getAdmin(args)
    }

    async addAdmin(args: { email: string; password: string }): Promise<IAdmin> {
        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        return await adminRepository.addAdmin(args)
    }

    async updateAdmin(filter: IAdminFilterArgs, args: Partial<IAdmin>): Promise<IAdmin> {
        return await adminRepository.updateAdmin(filter, args)
    }
}

export default new AdminService()
