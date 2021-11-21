import { BaseViewModel } from 'shared/view-models';
import { action, makeObservable } from 'mobx';
import { SingleClass } from 'pages/home/models';
import { httpService } from 'shared/services';
import { HttpError, HomepageError } from 'shared/errors';
import { CreateClassForm } from './models';

export class CreateClassViewModel extends BaseViewModel {
  constructor() {
    super();
    makeObservable(this, {
      createClass: action,
      handleError: action,
    });
  }

  async createClass(formValue: CreateClassForm) {
    this.startLoading();
    formValue.startDate = new Date(Date.now());
    console.log(formValue)
    const response: SingleClass | HttpError = await httpService.sendPost(
      '/class',
      formValue,
      httpService.getBearerToken()
    );
    this.stopLoading();

    if (response instanceof HttpError) {
      this.handleError(response);
      return false;
    } else {
      return true;
    }
  }
  handleError(response: HttpError) {
    const error: HomepageError = new HomepageError(response);
    this.makeError(error.getMessage());
  }
}

export const createClassViewModel = new CreateClassViewModel();
