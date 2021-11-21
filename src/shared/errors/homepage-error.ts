import { HttpError } from './http-error';

export class HomepageError extends HttpError {
    constructor(error: HttpError) {
      super();
      this.message = error.getMessage();
      this.statusCode = error.getStatusCode();
    }
  
    getMessage(): string {
      switch (this.message) {
        case 'User does not exists':
          return 'Người dùng không tồn tại';
        default:
          return super.getDefaultMessage();
      }
    }
  }