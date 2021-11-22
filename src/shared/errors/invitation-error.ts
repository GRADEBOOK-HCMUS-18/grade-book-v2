import { HttpError } from './http-error';

export class InvitationError extends HttpError {
    constructor(error?: HttpError, message?:string) {
      super();
      if(error instanceof HttpError){
        this.message = error.getMessage();
        this.statusCode = error.getStatusCode();
      }
      if(message)
      {
        this.message=message;
      }
    }
    getMessage(): string {
      switch (this.message) {
        case 'Invitation string does not exist':
          return 'Link mời không tồn tại';
        case "This user don't allow to join this class":
          return 'Bạn không được phép tham gia lớp học này';
        case "User already joined this class":
          return "Người dùng đã tham gia lớp học";
        default:
          return this.getDefaultMessage();
      }
    }
  }