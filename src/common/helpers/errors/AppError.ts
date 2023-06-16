class AppError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)

    this.statusCode = statusCode || 500
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
