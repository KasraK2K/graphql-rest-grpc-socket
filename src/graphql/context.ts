import userService from '../modules/users/user.service'
import userRepository from '../modules/users/user.repository'

export interface IContext {
  dataSource: {
    user: { repo: typeof userRepository; service: typeof userService }
  }
}

export const context: IContext = {
  dataSource: {
    user: { repo: userRepository, service: userService },
  },
}
