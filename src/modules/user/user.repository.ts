/* ----------------------------- Custom Modules ----------------------------- */
import Repository from '../../base/repository/Repository'
import { IUser, IUserFilterArgs, IUserLoginArgs } from '../../common/interfaces/user.interface'
import errorHandler from '../../common/helpers/errors/error.handler'
import { knex } from '../../bootstrap'
/* -------------------------------------------------------------------------- */

class UserRepository extends Repository {
    getUser(args: IUserLoginArgs): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this.findOne<IUser>('users', args)
                .then((result) => {
                    if (!result.row_count) return resolve(null)
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }

    addUser(args: { email: string; password: string }): Promise<IUser> {
        if ('email' in args) args.email = args.email.toLowerCase()

        return new Promise((resolve, reject) => {
            this.insertOne<IUser>('users', args)
                .then((result) => {
                    if (!result.row_count) return reject(errorHandler(500))
                    else return resolve(result.rows[0])
                })
                .catch((err) => reject(errorHandler(500, err.message)))
        })
    }

    updateUser(filter: IUserFilterArgs, args: Partial<IUser>): Promise<IUser> {
        if ('email' in filter) filter.email = filter.email.toLowerCase()
        if ('email' in args) args.email = args.email.toLowerCase()

        return new Promise((resolve, reject) => {
            knex<IUser>('users')
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

export default new UserRepository()
