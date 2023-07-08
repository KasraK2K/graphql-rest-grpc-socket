/* ------------------------------ Dependencies ------------------------------ */
import { resolve } from 'node:path'
/* ----------------------------- Custom Modules ----------------------------- */
import { grpc, loaderOptions, protoLoader } from '../../constants/grpc.config'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const PROTO_PATH = resolve(process.cwd(), 'src/applications/gRPC/default/proto/helloworld.proto')
const packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions)
const grpcObj = grpc.loadPackageDefinition(packageDef)
/* -------------------------------------------------------------------------- */

/* SECTION ------------------- Register Functions --------------------------- */
export const helloClient = (): Record<string, any> => {
    const client = new grpcObj.Greeter(process.env.GRPC_ADDRESS, grpc.credentials.createInsecure())

    return new Promise((resolve, reject) => {
        client.sayHello({ name: 'Kasra' }, (error, result) =>
            error ? reject(error) : resolve(result)
        )
    })
}
