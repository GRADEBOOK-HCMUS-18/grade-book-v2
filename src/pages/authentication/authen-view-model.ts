import { AuthenError, HttpError } from 'shared/errors';
import { TOKEN_KEY } from 'shared/constants';
import { UserAuthen, UserResponse, UserStore } from 'shared/types';
import { httpService, cryptoService, storageService } from 'shared/services';
import { BaseViewModel, userViewModel } from 'shared/view-models';

type AuthenType = 'login' | 'register' | 'google';
export class LoginViewModel extends BaseViewModel {
  async authenUser(user: UserAuthen, type: AuthenType) {
    let url = '/Authentication';
    if (type === 'register') url = '/Authentication/register';
    else if (type === 'google') url = '/Authentication/google';
    storageService.clearUser();
    this.startLoading();

    const response: UserResponse | HttpError = await httpService.sendPost(
      url,
      user
    );

    this.stopLoading();
    if (response instanceof HttpError) {
      this.handleError(response);
      return false;
    } else {
      this.storeUser(response);
      return true;
    }
  }

  getRememberUser(response: UserResponse): UserStore {
    return {
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      defaultProfilePictureHex: response.defaultProfilePictureHex,
      profilePictureUrl: response.profilePictureUrl,
      displayName: response.lastName + ' ' + response.firstName,
      isPasswordNotSet: response.isPasswordNotSet,
      studentIdentification: response.studentIdentification,
    };
  }

  storeUser(response: UserResponse) {
    const rememberUser = this.getRememberUser(response);
    const encryptToken = cryptoService.encrypt(response.token);
    storageService.setLocalStorage(TOKEN_KEY, encryptToken);
    userViewModel.updateUser(rememberUser);
  }

  handleError(response: HttpError) {
    const error: AuthenError = new AuthenError(response);
    this.makeError(error.getMessage());
  }
}
