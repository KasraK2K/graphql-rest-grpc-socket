/* ------------------------------ Dependencies ------------------------------ */

import { IUser } from './constants/interfaces'

/* --------------------------------- Modules -------------------------------- */

const database = {
  users: [
    { id: 1, name: 'user 1' },
    { id: 2, name: 'user 2' },
    { id: 3, name: 'user 3' },
  ],
}

class UserRepository {
  findAll(): IUser[] {
    return database.users
  }
}

export default new UserRepository()
