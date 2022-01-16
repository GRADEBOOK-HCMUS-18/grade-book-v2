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
        return 'Email này chưa có tài khoản trong hệ thống';

      case 'Wrong credential':
        return 'Mật khẩu sai';
      case 'Existed user':
        return 'Tài khoản với email này đã tồn tại, hãy đăng nhập lại !!!!';
      default:
        return super.getDefaultMessage();
    }
  }
}
