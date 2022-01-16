import { httpService } from 'shared/services';
import { HttpError } from 'shared/errors';
import {
  BaseViewModel,
  lineLoadingViewModel,
  userViewModel,
} from 'shared/view-models';
import { ErrorType } from './types';
import { translateCodeErrorMessage } from './helper';

export class ConfirmEmailViewModel extends BaseViewModel {
  async verifyIsValidCode(confirmationCode: string): Promise<ErrorType> {
    const res: ErrorType = {
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
      res.errorMessage = translateCodeErrorMessage(response.getMessage());
      this.makeError(res.errorMessage);
    } else {
      userViewModel.fetchUserAgain();
      res.status = true;
    }

    lineLoadingViewModel.stopLoading();

    return res;
  }
}
