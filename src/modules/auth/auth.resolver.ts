/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import authHandler from './auth.handler'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        loginAdmin: authHandler.loginAdmin,
        loginUser: authHandler.loginUser
    },

    Mutation: {
        registerAdmin: authHandler.registerAdmin,
        registerUser: authHandler.registerUser
    },

    Subscription: {
        countdown: {
            // This will return the value on every 1 sec until it reaches 0
            subscribe: async function* (_, { from }) {
                for (let i = from; i >= 0; i--) {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    yield { countdown: i }
                }
            }
        }
    }
}

export default resolvers
