/* ------------------------------ Dependencies ------------------------------ */

/* --------------------------------- Modules -------------------------------- */
import { Context } from '../../graphql/context'
import { IUser } from './constants/interfaces'

class UserService {
  findAll({ dataSource }: Context): IUser[] {
    return dataSource.user.repo.findAll()
  }
}

export default new UserService()
