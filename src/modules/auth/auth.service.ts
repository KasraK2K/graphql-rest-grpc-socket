/* ----------------------------- Custom Modules ----------------------------- */
import { IAdmin, IUser } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import { TokenType, UserType } from '../../common/enums/general.enum'
import errorHandler from '../../common/helpers/errors/error.handler'
import { ITokenPayload } from '../../common/interfaces'
import tokenHelper from '../../common/helpers/token.helper'
import userService from '../user/user.service'
import adminService from '../admin/admin.service'
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

        if (!admin) throw errorHandler(400, 'Admin does not exist.')

        const isPasswordValid = bcryptHelper.compareHash(password, admin.password)
        if (!isPasswordValid) throw errorHandler(400, 'Email and/or Password is wrong.')

        const payload: ITokenPayload = {
            id: admin.id,
            uid: admin.uid,
            user_type: UserType.ADMIN,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        await adminService.updateAdmin(
            { id: admin.id, uid: admin.uid, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

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

        if (!user) throw errorHandler(400, 'User does not exist.')

        const isPasswordValid = bcryptHelper.compareHash(password, user.password)
        if (!isPasswordValid) throw errorHandler(400, 'Email and/or Password is wrong.')

        // TODO : Send email to user email

        const payload: ITokenPayload = {
            id: user.id,
            uid: user.uid,
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        await userService.updateUser(
            { id: user.id, uid: user.uid, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

        return { token, user }
    }

    async registerAdmin(
        data: ITokenPayload,
        args: { email: string; password: string }
    ): Promise<{ token: string; admin: IAdmin }> {
        const { email, password } = args

        const foundedAdmin = await adminService.getAdmin({ email })
        if (foundedAdmin) throw errorHandler(409, 'Admin is already registered.')

        const admin: IAdmin = await adminService.addAdmin(data, { email, password })
        const payload: ITokenPayload = {
            id: admin.id,
            uid: admin.uid,
            user_type: UserType.ADMIN,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        await adminService.updateAdmin(
            { id: admin.id, uid: admin.uid, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

        return { token, admin }
    }

    async registerUser(args: {
        email: string
        password: string
    }): Promise<{ token: string; user: IUser }> {
        const { email, password } = args

        const findUser = await userService.getUser({ email })
        if (findUser) throw errorHandler(409, 'User is already registered.')

        const user: IUser = await userService.addUser({ email, password })
        const payload: ITokenPayload = {
            id: user.id,
            uid: user.uid,
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        await userService.updateUser(
            { id: user.id, uid: user.uid, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

        return { token, user }
    }
}

export default new AuthService()
