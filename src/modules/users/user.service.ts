/* ------------------------------ Dependencies ------------------------------ */
/* --------------------------------- Modules -------------------------------- */
import userRepository from './user.repository'

class UserService {
  findAll(parent: any, args: any, contextValue: any, info: any) {
    console.log({ parent, args, contextValue, info })
    return userRepository.findAll()
  }
}

export default new UserService()
