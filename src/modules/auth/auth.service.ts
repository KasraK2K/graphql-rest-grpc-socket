/* ----------------------------- Custom Modules ----------------------------- */
import authRepository from './auth.repository'
import { IUser } from '../../common/interfaces/user.interface'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import { TokenType, UserType } from '../../common/enums/general.enum'
import errorHandler from '../../common/helpers/errors/error.handler'
import { ITokenPayload } from '../../common/interfaces/general.interface'
import tokenHelper from '../../common/helpers/token.helper'
/* -------------------------------------------------------------------------- */

class AuthService {
    async loginLocalEntity(args: {
        type: UserType
        email: string
        password: string
    }): Promise<{ token: string; entity: IUser }> {
        const { type, email, password } = args
        let entity: IUser

        if (type === UserType.USER) entity = await authRepository.getUser({ email })
        // TODO : Change loginLocalEntity to get admin
        else if (type === UserType.ADMIN) entity = await authRepository.getUser({ email })
        else throw errorHandler(401)

        if (!entity) throw errorHandler(400, 'User with this credentials does not exist.')

        const isPasswordValid = bcryptHelper.compareHash(password, entity.password)
        if (!isPasswordValid) throw errorHandler(400, 'Email and/or Password is wrong.')

        const payload: ITokenPayload = {
            id: entity.id,
            uid: entity.uid,
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)

        return { token, entity }
    }

    async registerLocalUser(args: { email: string; password: string }): Promise<IUser> {
        args.password = bcryptHelper.hashGen(args.password)
        return await authRepository.addUser(args)
    }
}

export default new AuthService()
