import userRepository from './user.repository'

class UserService {
  findAll() {
    return userRepository.findAll()
  }
}

export default new UserService()
