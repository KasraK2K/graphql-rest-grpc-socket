const ROLES_SEED = [
    { id: 1, name: 'User', description: 'Default roles for users', permissions: [] },
    { id: 2, name: 'Admin', description: 'Default roles for admins', permissions: [1, 2, 3, 4] }
]

export default ROLES_SEED
