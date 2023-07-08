/* ------------------------------ Dependencies ------------------------------ */
import { resolve } from 'node:path'
/* ----------------------------- Custom Modules ----------------------------- */
import { grpc, grpcServer, loaderOptions, protoLoader } from '../../constants/grpc.config'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const PROTO_PATH = resolve(process.cwd(), 'src/applications/gRPC/default/proto/auth.proto')
const packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions)
const grpcObj = grpc.loadPackageDefinition(packageDef)
/* -------------------------------------------------------------------------- */

/* SECTION -------------------- Register Services --------------------------- */
grpcServer.addService(grpcObj.Auth.service, {
    // sayHello: (args, callback) => {
    //     const name = args.request.name
    //     const message = `message for name: ${name}`
    //     return !name
    //         ? callback({
    //               status: grpc.status.INVALID_ARGUMENT,
    //               message: 'Name should not be empty string'
    //           })
    //         : callback(null, { status: grpc.status.OK, message })
    // }
})
/* -------------------------------------------------------------------------- */
