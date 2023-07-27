/* ----------------------------- Custom Modules ----------------------------- */
import Repository from '../../base/repository/Repository'
import { IAdmin, IAdminFilterArgs, IAdminLoginArgs } from '../../common/interfaces/admin.interface'
import errorHandler from '../../common/helpers/errors/error.handler'
import { knex } from '../../bootstrap'
/* -------------------------------------------------------------------------- */

class AdminRepository extends Repository {
    getAdmin(args: IAdminLoginArgs): Promise<IAdmin> {
        return new Promise((resolve, reject) => {
            this.findOne<IAdmin>('admins', args)
                .then((result) => {
                    if (!result.row_count) return resolve(null)
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }

    addAdmin(args: { email: string; password: string }): Promise<IAdmin> {
        if ('email' in args) args.email = args.email.toLowerCase()

        return new Promise((resolve, reject) => {
            this.insertOne<IAdmin>('admins', args)
                .then((result) => {
                    if (!result.row_count) return reject(errorHandler(500))
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }

    updateAdmin(filter: IAdminFilterArgs, args: Partial<IAdmin>): Promise<IAdmin> {
        if ('email' in filter) filter.email = filter.email.toLowerCase()
        if ('email' in args) args.email = args.email.toLowerCase()

        return new Promise((resolve, reject) => {
            knex<IAdmin>('admins')
                .where(filter)
                .update(args)
                .returning('*')
                .then((result) => {
                    if (!result.length) return reject(errorHandler(500))
                    else return resolve(result[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }
}

export default new AdminRepository()
