/* ------------------------------ Dependencies ------------------------------ */

/* --------------------------------- Modules -------------------------------- */
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../../graphql/context'
import { IUser } from './constants/interfaces'
import graphErrorHandler from '../../common/helpers/errors/error.handler'

class UserService {
  findAll({ dataSource }: Context, info: GraphQLResolveInfo): IUser[] {
    // graphErrorHandler(info, 410)
    return dataSource.user.repo.findAll()
  }
}

export default new UserService()
