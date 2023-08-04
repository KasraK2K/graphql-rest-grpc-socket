/* ----------------------------- Custom Modules ----------------------------- */
import adminHandler from './admin.handler'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        admin: adminHandler.admin
    },

    Mutation: {
        addAdmin: adminHandler.addAdmin
    }
}

export default resolvers
