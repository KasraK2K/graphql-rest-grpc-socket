/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import authService from './auth.service'
import { IContext } from '../../graphql/context'
import { IUserAuthResponse, IAdminAuthResponse, IOmittedUser } from '../../common/interfaces'
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
    @AccessGate([1004])
    async registerAdmin(
        _parent: IAdminAuthResponse,
        args: { email: string; password: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IAdminAuthResponse> {
        const { token, admin } = await authService.registerAdmin(args)
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
     * Verify user email
     *
     * @param {IUserAuthResponse} _parent
     * @param {{ verify_token: string }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IOmittedUser>}
     * @memberof AuthHandler
     */
    async verifyUserEmail(
        _parent: IUserAuthResponse,
        args: { verify_token: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IOmittedUser> {
        return await authService.verifyUserEmail(args.verify_token)
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
