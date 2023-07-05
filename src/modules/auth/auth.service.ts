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
    async loginAdmin(args: {
        email: string
        password: string
    }): Promise<{ token: string; admin: IAdmin }> {
        const { email, password } = args
        const admin: IAdmin = await adminService.getAdmin({
            email,
            is_block: false,
            is_archive: false
        })

        const isPasswordValid = bcryptHelper.compareHash(password, admin.password)
        if (!isPasswordValid) throw errorHandler(400, 'Email and/or Password is wrong.')

        const payload: ITokenPayload = {
            id: admin.id,
            user_type: UserType.ADMIN,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)

        return { token, admin }
    }

    async loginUser(args: {
        email: string
        password: string
    }): Promise<{ token: string; user: IUser }> {
        const { email, password } = args
        const user: IUser = await userService.getUser({
            email,
            is_verify: true,
            is_block: false,
            is_archive: false
        })

        const isPasswordValid = bcryptHelper.compareHash(password, user.password)
        if (!isPasswordValid) throw errorHandler(400, 'Email and/or Password is wrong.')

        // TODO : Send email to user email

        const payload: ITokenPayload = {
            id: user.id,
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)

        return { token, user }
    }

    async registerAdmin(
        context: IContext,
        args: { email: string; password: string }
    ): Promise<{ token: string; admin: IAdmin }> {
        const { email, password } = args

        const isAdminExist: IAdmin = await adminService.getAdmin({ email })
        if (isAdminExist) throw errorHandler(409)

        const admin: IAdmin = await adminService.addAdmin(context, { email, password })
        if (!admin) throw errorHandler(400, 'Credentials is not valid.')

        const payload: ITokenPayload = {
            id: admin.id,
            user_type: UserType.ADMIN,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)

        return { token, admin }
    }

    async registerUser(args: {
        email: string
        password: string
    }): Promise<{ token: string; user: IUser }> {
        const { email, password } = args

        const isUserExist: IUser = await userService.getUser({ email })
        if (isUserExist) throw errorHandler(409)

        const user: IUser = await userService.addUser({ email, password })
        if (!user) throw errorHandler(400, 'Credentials is not valid.')

        const payload: ITokenPayload = {
            id: user.id,
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)

        return { token, user }
    }
}

export default new AuthService()
