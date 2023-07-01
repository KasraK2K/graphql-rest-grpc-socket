/* ----------------------------- Custom Modules ----------------------------- */
import { IUser } from './constants/interfaces'
/* -------------------------------------------------------------------------- */

const mockUser = {
    id: 1,
    uid: '5880f3a3-e353-4bb8-bc74-8b1b3e07e78f',
    first_name: 'Kasra',
    surname: 'Karami',
    email: 'Kasra_K2K@yahoo.com',
    password: '12345678',
    is_active: true,
    is_verified: true,
    is_blocked: false,
    is_admin: true,
    is_archived: false,
    roles: ['196be115-15dc-4866-8764-1a21a35078a7', 'a32aa32d-5391-41e7-920b-63f8145c8444'],
    created_at: '2016-01-01T14:10:20+01:00',
    updated_at: '2023-01-01T16:10:20+01:00',
    archived_at: null
}

class UserRepository {
    findOneUser(): IUser {
        return mockUser
    }
}

export default new UserRepository()
