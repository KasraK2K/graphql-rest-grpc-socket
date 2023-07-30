import { knex } from '../../bootstrap'
import { ROLES_SEED, PERMISSIONS_SEED } from '../constants/seeds'

const seeder = (table: string, initData: Record<string, any>[]) => {
    knex(table)
        .count()
        .then((result) => {
            const count = +result[0].count
            if (!count) knex.batchInsert(table, initData)
        })
        .catch(console.log)
}

const necessaryDataSeeder = async () => {
    seeder('roles', ROLES_SEED)
    seeder('permissions', PERMISSIONS_SEED)
}

export default necessaryDataSeeder
