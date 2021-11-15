import { AuthenError, HttpError } from 'shared/error';
import { TOKEN_KEY, USER_KEY } from 'shared/constants';
import { userViewModel } from 'shared/view-models';
import { UserAuthen, UserResponse } from 'shared/types';
import { httpService, cryptoService, storageService } from 'shared/services';
import { BaseViewModel } from 'shared/view-models';
export class LoginViewModel extends BaseViewModel {
  async login(user: UserAuthen): Promise<boolean> {
    storageService.clearUser();
    this.startLoading();
    const response: UserResponse | HttpError = await httpService.sendPost(
      '/Authentication',
      user
    );
    this.stopLoading();

    if (response instanceof HttpError) {
      const error: AuthenError = new AuthenError(response);
      this.makeError(error.getMessage());
      return false;
    } else {
      const rememberUser = this.getRememberUser(response);
      const encryptToken = cryptoService.encrypt(response.token);
      storageService.setLocalStorage(TOKEN_KEY, encryptToken);
      storageService.setLocalStorage(USER_KEY, JSON.stringify(rememberUser));
      userViewModel.updateUser(response);
      return true;
    }
  }

  async register(user: UserAuthen): Promise<boolean> {
    storageService.clearUser();
    this.startLoading();
    const response: UserResponse | HttpError = await httpService.sendPost(
      '/Authentication/register',
      user
    );
    this.stopLoading();
    if (response instanceof HttpError) {
      console.log(response);
      const error: AuthenError = new AuthenError(response);
      this.makeError(error.getMessage());
      return false;
    } else {
      const rememberUser = this.getRememberUser(response);
      const encryptToken = cryptoService.encrypt(response.token);
      storageService.setLocalStorage(TOKEN_KEY, encryptToken);
      storageService.setLocalStorage(USER_KEY, JSON.stringify(rememberUser));
      userViewModel.updateUser(response);
      this.stopLoading();
      return true;
    }
  }

  getRememberUser(response: UserResponse) {
    return {
      username: response.username,
      email: response.email,
      defaultProfilePictureHex: response.defaultProfilePictureHex,
      profilePictureUrl: response.profilePictureUrl,
    };
  }
}
