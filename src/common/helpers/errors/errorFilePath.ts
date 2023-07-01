/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLError } from 'graphql'
/* -------------------------------------------------------------------------- */

const errorFilePath = (error: unknown | Error | GraphQLError) => {
    if ((error instanceof Error || error instanceof GraphQLError) && error.stack) {
        const stack = error.stack.split('\n').map((line) => line.trim())
        let line: string

        error instanceof GraphQLError || error instanceof Error
            ? (line = stack[3])
            : (line = stack[1])

        const file_path = line.substring(
            line.indexOf('(') + process.cwd().length + 2,
            line.lastIndexOf(')')
        )
        const file_name = file_path.substring(
            file_path.lastIndexOf('/') + 1,
            file_path.indexOf(':')
        )
        return { file_name, file_path }
    } else return { file_name: 'unknown', file_path: 'unknown' }
}

export default errorFilePath
