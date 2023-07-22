/* ----------------------------- Custom Modules ----------------------------- */
import Repository from '../../base/repository/Repository'
import { IAdmin, IAdminLoginArgs } from '../../common/interfaces/admin.interface'
import errorHandler from '../../common/helpers/errors/error.handler'
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
        return new Promise((resolve, reject) => {
            this.insertOne<IAdmin>('admins', args)
                .then((result) => {
                    if (!result.row_count) return reject(errorHandler(500))
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }

    updateAdmin(args: Partial<IAdmin>): Promise<IAdmin> {
        return new Promise((resolve, reject) => {
            this.updateOne<IAdmin>('admins', args)
                .then((result) => {
                    if (!result.row_count) return reject(errorHandler(500))
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }
}

export default new AdminRepository()
