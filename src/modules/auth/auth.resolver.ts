/* ----------------------------- Custom Modules ----------------------------- */
import authHandler from './auth.handler'
/* -------------------------------------------------------------------------- */

const resolver = {
    Query: {
        loginAdmin: authHandler.loginAdmin,
        loginUser: authHandler.loginUser
    },

    Mutation: {
        registerAdmin: authHandler.registerAdmin,
        registerUser: authHandler.registerUser
    },

    Subscription: {
        countdown: authHandler.countdown
    }
}

export default resolver
