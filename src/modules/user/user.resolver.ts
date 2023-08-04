/* ----------------------------- Custom Modules ----------------------------- */
import userHandler from './user.handler'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        user: userHandler.user
    },

    Mutation: {
        addUser: userHandler.addUser
    }
}

export default resolvers
