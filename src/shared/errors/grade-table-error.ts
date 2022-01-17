// Student with Id ádsa is not in this class, consider adding her/him//

import { HttpError } from './http-error';
export class GradeTableError extends HttpError {
  constructor(error: HttpError) {
    super();
    this.message = error.getMessage();
    this.statusCode = error.getStatusCode();
  }

  getMessage(): string {
    if (this.message.includes('is not in this class')) {
      const tokens = this.message.split(' ');
      return `Sinh viên có MSSV ${tokens[3]} không có trong lớp này`;
    }
    return this.getDefaultMessage();
  }
}
