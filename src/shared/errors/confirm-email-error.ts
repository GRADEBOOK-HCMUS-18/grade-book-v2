import { HttpError } from './http-error';

export class ConfirmEmailError extends HttpError {
  constructor(error?: HttpError, message?: string) {
    super();
    if (error instanceof HttpError) {
      this.message = error.getMessage();
      this.statusCode = error.getStatusCode();
    }
    if (message) {
      this.message = message;
    }
  }
  getMessage(): string {
    if (this.message.startsWith('Confirmation code')) {
      return `Mã xác thực không chính xác.`;
    }
    switch (this.message) {
      case 'Invalid confirmation, you have maximum 10 minutes to confirm. Try again':
        return 'Mã xác thực không hợp lệ';
      default:
        return this.message;
    }
  }
}
