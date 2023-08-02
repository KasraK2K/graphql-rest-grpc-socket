import { ModuleNumber } from '../../../common/enums/general.enum'

const PERMISSIONS_SEED = [
    {
        id: 1,
        name: 'List of admins',
        description: 'Get list of all admins',
        module: ModuleNumber.ADMIN,
        access: 1002
    },
    {
        id: 2,
        name: 'List of users',
        description: 'Get list of all users',
        module: ModuleNumber.USER,
        access: 1001
    }
]

export default PERMISSIONS_SEED
