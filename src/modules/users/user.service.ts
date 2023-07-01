/* ----------------------------- Custom Modules ----------------------------- */
import userRepository from './user.repository'
import { IUser } from './constants/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
/* -------------------------------------------------------------------------- */

class UserService {
    async addUser(args: { email: string; password: string }): Promise<IUser> {
        args.password = bcryptHelper.hashGen(args.password)
        return await userRepository.addUser(args)
    }

    async getUser(args: { email: string }): Promise<IUser> {
        return await userRepository.getUser(args)
    }
}

export default new UserService()
