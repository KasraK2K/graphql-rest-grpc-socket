/* ----------------------------- Custom Modules ----------------------------- */
import Repository from '../../base/repository/Repository'
import { IAdmin } from '../../common/interfaces/admin.interface'
import errorHandler from '../../common/helpers/errors/error.handler'
/* -------------------------------------------------------------------------- */

class AdminRepository extends Repository {
    addAdmin(args: { email: string; password: string }): Promise<IAdmin> {
        return new Promise((resolve, reject) => {
            this.insertOne<IAdmin>('admins', args)
                .then((result) => {
                    if (!result.row_count) return reject(errorHandler(404))
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }

    getAdmin(args: { email: string }): Promise<IAdmin> {
        return new Promise((resolve, reject) => {
            this.findOne<IAdmin>('admins', args)
                .then((result) => {
                    if (!result.row_count) return reject(errorHandler(404))
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }
}

export default new AdminRepository()
