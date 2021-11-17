import { AxiosResponse } from 'axios';

export class HttpError {
  protected statusCode: number = 0;
  protected message: string = '';

  constructor(response?: AxiosResponse) {
    if (response) {
      this.statusCode = response.status;
      this.message = response.data;
    }
  }

  getMessage() {
    return this.message;
  }
  getStatusCode() {
    return this.statusCode;
  }

  getDefaultMessage() {
    return 'Ko thể kết nối tới server';
  }
}
