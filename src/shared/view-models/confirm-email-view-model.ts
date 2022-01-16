import { httpService } from 'shared/services';
import { ConfirmEmailError, HttpError } from 'shared/errors';
import {
  BaseViewModel,
  lineLoadingViewModel,
  userViewModel,
} from 'shared/view-models';

export class ConfirmEmailViewModel extends BaseViewModel {
  async sendConfirmationCode() {
    let result = true;
    lineLoadingViewModel.startLoading();

    const response: any | ConfirmEmailViewModel = await httpService.sendPost(
      `/Authentication/confirmation`,
      {},
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      this.makeError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      result = false;
    } else {
      result = true;
    }

    lineLoadingViewModel.stopLoading();

    return result;
  }

  async verifyIsValidCode(confirmationCode: string): Promise<{
    status: boolean;
    errorMessage: string;
  }> {
    const res: {
      status: boolean;
      errorMessage: string;
    } = {
      status: false,
      errorMessage: '',
    };

    lineLoadingViewModel.startLoading();

    const response: any | HttpError = await httpService.sendPost(
      `/Authentication/confirmation/code`,
      { confirmationCode: confirmationCode },
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      res.status = false;
      res.errorMessage = response.getMessage();
    } else {
      userViewModel.fetchUserAgain();
      res.status = true;
    }

    lineLoadingViewModel.stopLoading();

    return res;
  }
}

export const confirmEmailViewModel = new ConfirmEmailViewModel();