/* ----------------------------- Custom Modules ----------------------------- */
import userRepository from './user.repository'
import { IUser } from '../../common/interfaces/user.interface'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
/* -------------------------------------------------------------------------- */

class UserService {
    async getUser(args: { email: string }): Promise<IUser> {
        args.email = args.email.toLowerCase()
        return await userRepository.getUser(args)
    }

    async addUser(args: { email: string; password: string }): Promise<IUser> {
        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        return await userRepository.addUser(args)
    }
}

export default new UserService()
