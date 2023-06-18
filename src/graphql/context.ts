import userRepository from '../modules/users/user.repository'

export interface Context {
  dataSource: {
    repo: {
      user: typeof userRepository
    }
  }
}

export const context: Context = {
  dataSource: {
    repo: {
      user: userRepository,
    },
  },
}
