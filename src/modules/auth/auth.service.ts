/* ----------------------------- Custom Modules ----------------------------- */
import { IAdmin, IUser } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import { TokenType, UserType } from '../../common/enums/general.enum'
import errorHandler from '../../common/helpers/errors/error.handler'
import { ITokenPayload } from '../../common/interfaces'
import tokenHelper from '../../common/helpers/token.helper'
import userService from '../user/user.service'
import adminService from '../admin/admin.service'
import { IContext } from '../../graphql/context'
/* -------------------------------------------------------------------------- */

class AuthService {
    async loginEntity(args: {
        type: UserType
        email: string
        password: string
    }): Promise<{ token: string; entity: IUser | IAdmin }> {
        const { type, email, password } = args
        let entity: IUser | IAdmin

        const getEntity = type === UserType.ADMIN ? adminService.getAdmin : userService.getUser

        if (!Object.values(UserType).includes(type))
            throw errorHandler(400, 'Can not recognize user type')
        else entity = await getEntity({ email })

        if (!entity) throw errorHandler(400, 'Credentials is not valid.')

        const isPasswordValid = bcryptHelper.compareHash(password, entity.password)
        if (!isPasswordValid) throw errorHandler(400, 'Email and/or Password is wrong.')

        const payload: ITokenPayload = {
            id: entity.id,
            user_type: UserType[type.toString()],
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)

        return { token, entity }
    }

    async registerEntity(
        context: IContext,
        args: {
            type: UserType
            email: string
            password: string
        }
    ): Promise<{ token: string; entity: IUser | IAdmin }> {
        const { type, email, password } = args
        let entity: IUser | IAdmin

        // If requested type is equal to admin
        if (UserType[type.toString()] === UserType.ADMIN) {
            if (!context.token) throw errorHandler(401)
            const { data } = tokenHelper.verify(context.token)
            if (data.user_type !== UserType.ADMIN) throw errorHandler(403)
        }

        const addEntity = type === UserType.ADMIN ? adminService.addAdmin : userService.addUser

        if (!Object.values(UserType).includes(type))
            throw errorHandler(400, 'Can not recognize user type')
        else entity = await addEntity({ email, password })

        if (!entity) throw errorHandler(400, 'Credentials is not valid.')

        const payload: ITokenPayload = {
            id: entity.id,
            user_type: UserType[type.toString()],
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)

        return { token, entity }
    }
}

export default new AuthService()
