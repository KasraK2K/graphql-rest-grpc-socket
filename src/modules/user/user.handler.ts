/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import userService from './user.service'
import { IContext } from '../../graphql/context'
import { IUser } from '../../common/interfaces'
import { TypeGate, AccessGate } from '../../common/decorators'
import { UserType } from '../../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

/**
 * UserHandler class is useful to using decorator then create instance and map to resolver
 *
 * @class UserHandler
 */
class UserHandler {
    /**
     * Get user with id or email
     *
     * @param {IUser} _parent
     * @param {{ email: string; }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IUser>}
     * @memberof AuthHandler
     */
    @TypeGate([UserType.ADMIN])
    @AccessGate([1001])
    async user(
        _parent: IUser,
        args: { email: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IUser> {
        return await userService.getUser(args)
    }

    /**
     * Register user mutation
     *
     * @param {IUser} _parent
     * @param {{ email: string; password: string }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IUser>}
     * @memberof AuthHandler
     */
    @TypeGate([UserType.ADMIN])
    @AccessGate([1002])
    async addUser(
        _parent: IUser,
        args: { email: string; password: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IUser> {
        return await userService.addUser(args)
    }
}

export default new UserHandler()
