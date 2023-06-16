import AppError from './AppError'

const errorFilePath = (error: unknown | Error | AppError) => {
  if ((error instanceof Error || error instanceof AppError) && error.stack) {
    let stack = error.stack.split('\n').map((line) => line.trim())
    const file_path = stack[1].substring(
      stack[1].indexOf('(') + process.cwd().length + 2,
      stack[1].lastIndexOf(')')
    )
    const file_name = file_path.substring(file_path.lastIndexOf('/') + 1, file_path.indexOf(':'))
    return { file_name, file_path }
  } else return {}
}

export default errorFilePath
