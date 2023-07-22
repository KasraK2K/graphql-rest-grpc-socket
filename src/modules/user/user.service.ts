/* ----------------------------- Custom Modules ----------------------------- */
import userRepository from './user.repository'
import { IUser, IUserFilterArgs, IUserLoginArgs } from '../../common/interfaces/user.interface'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
/* -------------------------------------------------------------------------- */

class UserService {
    async getUser(args: IUserLoginArgs): Promise<IUser> {
        args.email = args.email.toLowerCase()
        return await userRepository.getUser(args)
    }

    async addUser(args: { email: string; password: string }): Promise<IUser> {
        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        return await userRepository.addUser(args)
    }

    async updateUser(filter: IUserFilterArgs, args: Partial<IUser>): Promise<IUser> {
        return await userRepository.updateUser(filter, args)
    }
}

export default new UserService()
