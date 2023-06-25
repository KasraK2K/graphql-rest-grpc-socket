import userService from '../modules/users/user.service'
import userRepository from '../modules/users/user.repository'

export interface IContext {
  dataSource: {
    user: { repo: typeof userRepository; service: typeof userService }
  }

  req: Record<string, any>
  res: Record<string, any>
  waitUntil: Record<string, any>
  request: Record<string, any>
  params: Record<string, any>

  token?: string
}

export const context: Partial<IContext> = {
  dataSource: {
    user: { repo: userRepository, service: userService },
  },
}
