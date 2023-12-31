/* ----------------------------- Custom Modules ----------------------------- */
import userRepository from './user.repository'
import { IUser, IUserFilterArgs } from '../../common/interfaces/user.interface'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import { uniqueString } from './../../common/helpers/unique.helper'
/* -------------------------------------------------------------------------- */

class UserService {
    async getUser(args: Partial<IUser>): Promise<IUser> {
        if ('email' in args) args.email = args.email.toLowerCase()
        return await userRepository.getUser(args)
    }

    async addUser(args: { email: string; password: string }): Promise<IUser> {
        args.password = bcryptHelper.hashGen(args.password)
        args.email = args.email.toLowerCase()
        const verify_token = uniqueString()
        return await userRepository.addUser({ ...args, verify_token })
    }

    async updateUser(filter: IUserFilterArgs, args: Partial<IUser>): Promise<IUser> {
        return await userRepository.updateUser(filter, args)
    }
}

export default new UserService()
