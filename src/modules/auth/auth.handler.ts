/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import authService from './auth.service'
import { IContext } from '../../graphql/context'
import { IUserAuthResponse, IAdminAuthResponse } from '../../common/interfaces'
import { TypeGate, AccessGate } from '../../common/decorators'
import { UserType } from '../../common/enums/general.enum'
/* -------------------------------------------------------------------------- */
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
    @TypeGate([UserType.ADMIN])
    @AccessGate([1002])
    async registerAdmin(
        _parent: IAdminAuthResponse,
        args: { email: string; password: string },
        context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IAdminAuthResponse> {
        const { token_payload } = context
        const { token, admin } = await authService.registerAdmin(token_payload, args)
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

export default new AuthHandler()
