/* ----------------------------- Custom Modules ----------------------------- */
import authHandler from './auth.handler'
/* -------------------------------------------------------------------------- */

const resolver = {
    Mutation: {
        loginAdmin: authHandler.loginAdmin,
        loginUser: authHandler.loginUser,
        registerAdmin: authHandler.registerAdmin,
        registerUser: authHandler.registerUser
    },

    Subscription: {
        countdown: authHandler.countdown
    }
}

export default resolver
