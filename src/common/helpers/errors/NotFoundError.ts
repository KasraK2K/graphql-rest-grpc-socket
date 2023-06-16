import AppError from './AppError'

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message || 'Resource not found', 404)
  }
}

export default NotFoundError
