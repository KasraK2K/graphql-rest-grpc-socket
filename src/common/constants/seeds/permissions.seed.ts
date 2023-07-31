import { ModuleNumber } from '../../../common/enums/general.enum'

const PERMISSIONS_SEED = [
    {
        id: 1,
        name: 'Default User Permissions',
        description: 'Default permissions for normal users',
        module: ModuleNumber.USER,
        access: [1001]
    },
    {
        id: 2,
        name: 'Default Admin Permissions',
        description: 'Default permissions for normal users',
        module: ModuleNumber.ADMIN,
        access: [1002]
    }
]

export default PERMISSIONS_SEED
