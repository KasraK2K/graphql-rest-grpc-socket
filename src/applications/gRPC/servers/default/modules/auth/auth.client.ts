/* ------------------------------ Dependencies ------------------------------ */
import { resolve } from 'node:path'
/* ----------------------------- Custom Modules ----------------------------- */
import { grpc, loaderOptions, protoLoader } from '../../../../constants/grpc.config'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- Admin --------------------------------- */
// loginAdmin({
//     email: 'Kasra_K2K@yahoo.com',
//     password: '12345678'
// }).then(console.log).catch(console.log)

// registerAdmin({
//     email: 'Kasra_K2K@yahoo.com',
//     password: '12345678',
//     authorization: 'Bearer __TOKEN__'
// }).then(console.log).catch(console.log)
/* ---------------------------------- User ---------------------------------- */
// loginUser({
//     email: 'Kasra_K2K@yahoo.com',
//     password: '12345678'
// }).then(console.log).catch(console.log)

// registerUser({
//     email: 'Kasra_K2K@yahoo.com',
//     password: '12345678',
// }).then(console.log).catch(console.log)
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const PROTO_PATH = resolve(
    process.cwd(),
    'src/applications/gRPC/servers/default/modules/auth/auth.proto'
)
const packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions)
const grpcObj = grpc.loadPackageDefinition(packageDef)
/* -------------------------------------------------------------------------- */

/* SECTION ------------------- Register Functions --------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Login Admin                                */
/* -------------------------------------------------------------------------- */
export const loginAdmin = (args: { email: string; password: string }) => {
    const client = new grpcObj.authentication.Auth(
        process.env.GRPC_ADDRESS,
        grpc.credentials.createInsecure()
    )
    return new Promise((resolve, reject) => {
        client.loginAdmin(args, (error, result) => (error ? reject(error) : resolve(result)))
    })
}

/* -------------------------------------------------------------------------- */
/*                                 Login User                                 */
/* -------------------------------------------------------------------------- */
export const loginUser = (args: { email: string; password: string }) => {
    const client = new grpcObj.authentication.Auth(
        process.env.GRPC_ADDRESS,
        grpc.credentials.createInsecure()
    )
    return new Promise((resolve, reject) => {
        client.loginUser(args, (error, result) => (error ? reject(error) : resolve(result)))
    })
}

/* -------------------------------------------------------------------------- */
/*                               Register Admin                               */
/* -------------------------------------------------------------------------- */
export const registerAdmin = (args: { email: string; password: string; authorization: string }) => {
    const client = new grpcObj.authentication.Auth(
        process.env.GRPC_ADDRESS,
        grpc.credentials.createInsecure()
    )
    return new Promise((resolve, reject) => {
        client.registerAdmin(args, (error, result) => (error ? reject(error) : resolve(result)))
    })
}

/* -------------------------------------------------------------------------- */
/*                                Register User                               */
/* -------------------------------------------------------------------------- */
export const registerUser = (args: { email: string; password: string }) => {
    const client = new grpcObj.authentication.Auth(
        process.env.GRPC_ADDRESS,
        grpc.credentials.createInsecure()
    )
    return new Promise((resolve, reject) => {
        client.registerUser(args, (error, result) => (error ? reject(error) : resolve(result)))
    })
}
