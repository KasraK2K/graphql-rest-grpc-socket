/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLError } from 'graphql'
/* -------------------------------------------------------------------------- */

const errorFilePath = (error: unknown | Error | GraphQLError) => {
    if ((error instanceof Error || error instanceof GraphQLError) && error.stack) {
        const stack = error.stack.split('\n').map((line) => line.trim())
        let line: string

        line =
            error instanceof GraphQLError || error instanceof Error
                ? (line = stack[3].trim())
                : (line = stack[1].trim())

        const hasParentheses = line.endsWith(')')
        let file_path: string
        let file_name: string

        if (hasParentheses) {
            file_path = line.slice(line.indexOf('/src') + 1, line.length - 1)
            file_name = line.slice(line.lastIndexOf('/') + 1, line.indexOf(':'))
        } else {
            file_path = line.slice(line.indexOf('/src') + 1)
            file_name = line.slice(line.lastIndexOf('/') + 1, line.indexOf(':'))
        }

        return { file_name, file_path }
    } else return { file_name: 'unknown', file_path: 'unknown' }
}

export default errorFilePath
