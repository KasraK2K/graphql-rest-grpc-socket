/* ------------------------------ Dependencies ------------------------------ */
/* --------------------------------- Modules -------------------------------- */
const database = {
  users: [
    { id: 1, name: 'user 1' },
    { id: 2, name: 'user 2' },
    { id: 3, name: 'user 3' },
  ],
}

class UserRepository {
  findAll() {
    return database.users
  }
}

export default new UserRepository()
