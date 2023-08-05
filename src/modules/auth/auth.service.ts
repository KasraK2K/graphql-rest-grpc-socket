/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import { IAdmin, IOmittedAdmin, IOmittedUser, IUser } from '../../common/interfaces'
import bcryptHelper from '../../common/helpers/bcrypt.helper'
import { TokenType, UserType } from '../../common/enums/general.enum'
import errorHandler from '../../common/helpers/errors/error.handler'
import { ITokenPayload } from '../../common/interfaces'
import tokenHelper from '../../common/helpers/token.helper'
import userService from '../user/user.service'
import adminService from '../admin/admin.service'
import nodeMailer from '../../integrations/nodemailer'
/* -------------------------------------------------------------------------- */

class AuthService {
    async loginAdmin(args: {
        email: string
        password: string
    }): Promise<{ token: string; admin: IOmittedAdmin }> {
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
            user_type: UserType.ADMIN,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        await adminService.updateAdmin(
            { id: admin.id, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

        return { token, admin: this.getOmittedAdmin(admin) }
    }

    async loginUser(args: {
        email: string
        password: string
    }): Promise<{ token: string; user: IOmittedUser }> {
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
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        await userService.updateUser(
            { id: user.id, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

        return { token, user: this.getOmittedUser(user) }
    }

    async registerAdmin(args: {
        email: string
        password: string
    }): Promise<{ token: string; admin: IOmittedAdmin }> {
        const { email, password } = args

        const foundedAdmin = await adminService.getAdmin({ email })
        if (foundedAdmin) throw errorHandler(409, 'Admin is already registered.')

        const admin: IAdmin = await adminService.addAdmin({ email, password })
        const payload: ITokenPayload = {
            id: admin.id,
            user_type: UserType.ADMIN,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        await adminService.updateAdmin(
            { id: admin.id, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

        return { token, admin: this.getOmittedAdmin(admin) }
    }

    async registerUser(args: {
        email: string
        password: string
    }): Promise<{ token: string; user: IOmittedUser }> {
        const { email, password } = args

        const findUser = await userService.getUser({ email })
        if (findUser) throw errorHandler(409, 'User is already registered.')

        const user: IUser = await userService.addUser({ email, password })
        const payload: ITokenPayload = {
            id: user.id,
            user_type: UserType.USER,
            token_type: TokenType.TOKEN
        }
        const token = tokenHelper.sign(payload)
        // const verify_token = uniqueString()
        await userService.updateUser(
            { id: user.id, email },
            { last_token: token, last_login_at: 'NOW()' }
        )

        await nodeMailer.sendMail<Partial<IUser>>(
            { to: user.email, subject: 'Verify Wisdom Account' },
            'verifyEmail',
            user
        )

        return { token, user: this.getOmittedUser(user) }
    }

    async verifyUserEmail(verify_token: string): Promise<IOmittedUser> {
        const user: IUser = await userService.getUser({
            verify_token,
            is_verify: false,
            is_block: false,
            is_archive: false
        })
        if (!user) throw errorHandler(404, 'Token is broken.')
        const updatedUser = await userService.updateUser({ id: user.id }, { is_verify: true })
        return this.getOmittedUser(updatedUser)
    }

    private getOmittedAdmin(admin: IAdmin): IOmittedAdmin {
        return _.omit(admin, ['password'])
    }

    private getOmittedUser(user: IUser): IOmittedUser {
        return _.omit(user, ['password', 'last_token', 'verify_token'])
    }
}

export default new AuthService()
