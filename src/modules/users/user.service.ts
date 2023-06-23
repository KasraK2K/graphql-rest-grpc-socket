/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from '../../graphql/context'
import { IUser } from './constants/interfaces'
// import graphErrorHandler from '../../common/helpers/errors/error.handler'
/* -------------------------------------------------------------------------- */

class UserService {
  findAll({ dataSource }: IContext, info: GraphQLResolveInfo): IUser[] {
    // graphErrorHandler(info, 404)
    // for (const item in Array(10000000).fill(0)) {
    // }
    return dataSource.user.repo.findAll()
  }
}

export default new UserService()
