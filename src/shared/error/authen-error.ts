import { HttpError } from './http-error';
export class AuthenError extends HttpError {
  constructor(error: HttpError) {
    super();
    this.message = error.getMessage();
    this.statusCode = error.getStatusCode();
  }

  getMessage(): string {
    switch (this.message) {
      case 'No user with that username or email':
        return 'Tên đăng nhập hoặc email không tồn tại';
      case 'Existed user':
        return 'Tên đăng nhập hoặc email đã tồn tại';
      default:
        return super.getDefaultMessage();
    }
  }
}
