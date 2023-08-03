/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import authService from './auth.service'
import { IContext } from '../../graphql/context'
import { IUserAuthResponse, IAdminAuthResponse, ITokenPayload } from '../../common/interfaces'
import tokenHelper from '../../common/helpers/token.helper'
import errorHandler from '../../common/helpers/errors/error.handler'
import { IApplicationConfig } from '../../../config/config.interface'
import { TypeGate, AccessGate } from '../../common/decorators'
import { UserType } from '../../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')

/**
 * AuthHandler class is useful to using decorator then create instance and map to resolver
 *
 * @class AuthHandler
 */
class AuthHandler {
    /**
     * Login admin mutation
     *
     * @param {IAdminAuthResponse} _parent
     * @param {{ email: string; password: string }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IAdminAuthResponse>}
     * @memberof AuthHandler
     */
    @TypeGate([UserType.ADMIN, UserType.USER])
    @AccessGate([1009])
    async loginAdmin(
        _parent: IAdminAuthResponse,
        args: { email: string; password: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IAdminAuthResponse> {
        const { token, admin } = await authService.loginAdmin(args)

        return { token, admin }
    }

    /**
     * Login user Mutation
     *
     * @param {IUserAuthResponse} _parent
     * @param {{ email: string; password: string }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IUserAuthResponse>}
     * @memberof AuthHandler
     */
    @TypeGate([UserType.ADMIN, UserType.USER])
    @AccessGate([1001])
    async loginUser(
        _parent: IUserAuthResponse,
        args: { email: string; password: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IUserAuthResponse> {
        const { token, user } = await authService.loginUser(args)
        return { token, user }
    }

    /**
     * Register admin mutation
     *
     * @param {IAdminAuthResponse} _parent
     * @param {{ email: string; password: string }} args
     * @param {IContext} context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IAdminAuthResponse>}
     * @memberof AuthHandler
     */
    async registerAdmin(
        _parent: IAdminAuthResponse,
        args: { email: string; password: string },
        context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IAdminAuthResponse> {
        const { data } = getTokenAndPayload(context)
        const { token, admin } = await authService.registerAdmin(data, args)
        return { token, admin }
    }

    /**
     * Register user mutation
     *
     * @param {IUserAuthResponse} _parent
     * @param {{ email: string; password: string }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IUserAuthResponse>}
     * @memberof AuthHandler
     */
    async registerUser(
        _parent: IUserAuthResponse,
        args: { email: string; password: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IUserAuthResponse> {
        const { token, user } = await authService.registerUser(args)
        return { token, user }
    }

    /**
     * Test model of subscription to have an example of subscription
     *
     * @memberof AuthHandler
     */
    countdown = {
        subscribe: async function* (_parent: unknown, { from }) {
            for (let i = from; i >= 0; i--) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                yield { countdown: i }
            }
        }
    }
}

/**
 * This function is useful to get token and token payload
 *
 * @param {IContext} context
 * @return {*}  {{ token: string; data: ITokenPayload }}
 */
const getTokenAndPayload = (context: IContext): { token: string; data: ITokenPayload } => {
    const authorization = context.request.headers.get(applicationConfig.bearerHeader)
    if (authorization) {
        const token = authorization.slice(applicationConfig.bearer.length + 1)
        const { valid, data } = tokenHelper.verify(token)
        if (!valid) throw errorHandler(403)
        else return { token, data }
    } else throw errorHandler(401)
}

export default new AuthHandler()
