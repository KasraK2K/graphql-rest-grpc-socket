import userService from '../modules/users/user.service'
import userRepository from '../modules/users/user.repository'

export interface Context {
  dataSource: {
    user: { repo: typeof userRepository; service: typeof userService }
  }
}

export const context: Context = {
  dataSource: {
    user: { repo: userRepository, service: userService },
  },
}
