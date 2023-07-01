/* ----------------------------- Custom Modules ----------------------------- */
import userRepository from './user.repository'
import { IUser } from './constants/interfaces'
/* -------------------------------------------------------------------------- */

class UserService {
    async addUser(args: { email: string; password: string }): Promise<IUser> {
        return await userRepository.addUser(args)
    }

    async getUser(args: { email: string }): Promise<IUser> {
        return await userRepository.getUser(args)
    }
}

export default new UserService()
