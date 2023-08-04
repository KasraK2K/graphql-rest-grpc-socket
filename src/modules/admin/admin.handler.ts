/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import adminService from './admin.service'
import { IContext } from '../../graphql/context'
import { IAdmin } from '../../common/interfaces'
import { TypeGate, AccessGate } from '../../common/decorators'
import { UserType } from '../../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

/**
 * AdminHandler class is useful to using decorator then create instance and map to resolver
 *
 * @class AdminHandler
 */
class AdminHandler {
    /**
     * Get admin with id or email
     *
     * @param {IAdmin} _parent
     * @param {{ email: string; }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IAdmin>}
     * @memberof AuthHandler
     */
    @TypeGate([UserType.ADMIN])
    @AccessGate([1003])
    async admin(
        _parent: IAdmin,
        args: { email: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IAdmin> {
        return await adminService.getAdmin(args)
    }

    /**
     * Register admin mutation
     *
     * @param {IAdmin} _parent
     * @param {{ email: string; password: string }} args
     * @param {IContext} _context
     * @param {GraphQLResolveInfo} _info
     * @return {*}  {Promise<IAdmin>}
     * @memberof AuthHandler
     */
    @TypeGate([UserType.ADMIN])
    @AccessGate([1004])
    async addAdmin(
        _parent: IAdmin,
        args: { email: string; password: string },
        _context: IContext,
        _info: GraphQLResolveInfo
    ): Promise<IAdmin> {
        return await adminService.addAdmin(args)
    }
}

export default new AdminHandler()
