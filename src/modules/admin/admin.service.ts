/* ----------------------------- Custom Modules ----------------------------- */
import adminRepository from './admin.repository'
import { IAdmin } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
/* -------------------------------------------------------------------------- */

class AdminService {
    async getAdmin(args: { email: string }): Promise<IAdmin> {
        args.email = args.email.toLowerCase()
        return await adminRepository.getAdmin(args)
    }

    async addAdmin(args: { email: string; password: string }): Promise<IAdmin> {
        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        return await adminRepository.addAdmin(args)
    }
}

export default new AdminService()
