import { httpService } from 'shared/services';
import { HttpError } from 'shared/errors';
import { BaseViewModel, lineLoadingViewModel } from 'shared/view-models';
import { ErrorType } from './types';
import { translateCodeErrorMessage } from './helper';

export class ConfirmEmailViewModel extends BaseViewModel {
  async sendConfirmationCode() {
    let result = true;
    lineLoadingViewModel.startLoading();

    const response: any | HttpError = await httpService.sendPost(
      `Authentication/confirmation`,
      {},
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      //this.makeError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      result = false; 
    } else {
      result = true;
    }

    lineLoadingViewModel.stopLoading();

    return true;
  }

  async verifyIsValidCode(confirmationCode: string): Promise<ErrorType> {
    const res: ErrorType = {
      status: false,
      errorMessage: '',
    };

    lineLoadingViewModel.startLoading();

    const response: any | HttpError = await httpService.sendPost(
      `Authentication/confirmation/code`,
      { confirmationCode: confirmationCode },
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      res.status = false;
      res.errorMessage = translateCodeErrorMessage(response.getMessage());
    } else {
      res.status = true;
    }

    lineLoadingViewModel.stopLoading();

    return res;
  }
}
