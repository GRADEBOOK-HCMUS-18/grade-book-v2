import { HttpError } from './http-error';
export class ProfileError extends HttpError {
  constructor(error: HttpError) {
    super();
    this.message = error.getMessage();
    this.statusCode = error.getStatusCode();
  }

  getMessage(): string {
    try {
      if (this.message.includes('Student with')) {
        this.message = 'Mã số sinh viên đã tồn tại';
      } else if (this.message.includes('email')) {
        const tokens = this.message.split(' ');
        this.message = `Đã có tài khoản tồn tại với  email ${tokens[2]}`;
      } else if (this.message.includes('password')) {
        this.message = 'Mật khẩu cũ không đúng';
      } else {
        return super.getDefaultMessage();
      }
      return this.message;
    } catch (error) {
      return super.getDefaultMessage();
    }
  }
}
