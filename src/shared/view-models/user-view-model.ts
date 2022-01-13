import { HttpError, ProfileError } from 'shared/errors';
import { makeObservable, observable, action } from 'mobx';
import { TOKEN_KEY } from 'shared/constants';
import { httpService, storageService } from 'shared/services';
import { UserResponse, UserStore } from 'shared/types';
import { User } from 'shared/models';
import { BaseViewModel } from './base-view-model';
import { lineLoadingViewModel } from '.';
class UserViewModel extends BaseViewModel {
  user: User = new User();
  dataVersion: number = 0;

  constructor() {
    super();
    makeObservable(this, {
      dataVersion: observable,
      user: observable,
      updateUser: action,
      updateUserAvatar: action,
    });
  }

  isLogin() {
    return storageService.getLocalStorage(TOKEN_KEY) !== null;
  }

  updateUserAvatar(avatar: string) {
    this.user.profilePictureUrl = avatar;
    this.user = User.map(this.user);
  }

  updateUser(user: UserStore) {
    const {
      firstName,
      lastName,
      email,
      profilePictureUrl,
      defaultProfilePictureHex,
      isPasswordNotSet,
      isEmailConfirmed,
      isLocked,
      displayName,
      studentIdentification,
    } = user;

    const temp = new User();
    temp.profilePictureUrl = profilePictureUrl;
    temp.email = email;
    temp.firstName = firstName;
    temp.lastName = lastName;
    temp.defaultProfilePictureHex = defaultProfilePictureHex;
    temp.displayName = displayName;
    temp.isPasswordNotSet = isPasswordNotSet
      ? isPasswordNotSet
      : this.user.isPasswordNotSet;
    temp.isEmailConfirmed = isEmailConfirmed;
    temp.isLocked = isLocked;
    temp.studentIdentification = studentIdentification;
    this.user = User.map(temp);
  }

  logout() {
    storageService.clearUser();
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
      isEmailConfirmed: response.isEmailConfirmed,
      isLocked:response.isLocked,
    };
  }

  async fetchUserAgain ():Promise<boolean>{
    const response:UserResponse |HttpError = await httpService.sendGet('/user', httpService.getBearerToken())
    
    if (response instanceof HttpError) {
      return false;
    } else {
      const rememberUser: UserStore = this.getRememberUser(response);
      this.updateUser(rememberUser);
      return true;
    }
  }

  async requestNewAvatar(data: any): Promise<boolean> {
    const response: { profilePictureUrl: string } | HttpError =
      await httpService.sendFile(
        '/User/avatar',
        'PUT',
        data,
        httpService.getBearerToken()
      );
    if (response instanceof HttpError) {
      return false;
    } else {
      this.updateUserAvatar(response.profilePictureUrl);
      return true;
    }
  }

  async requestNewInfo(user: User): Promise<boolean> {
    const response: UserStore | HttpError = await httpService.sendPut(
      '/User',
      user,
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      const profileError = new ProfileError(response);
      this.makeError(profileError.getMessage());

      return false;
    } else {
      this.updateUser(response);
      return true;
    }
  }
  async updatePassword(
    newPassword: string,
    oldPassword?: string
  ): Promise<boolean> {
    if (!oldPassword) {
      oldPassword = '';
    }
    const response: UserStore | HttpError = await httpService.sendPut(
      '/User/password',
      { newPassword, oldPassword },
      httpService.getBearerToken()
    );
    if (response instanceof HttpError) {
      const profileError = new ProfileError(response);
      this.makeError(profileError.getMessage());
      return false;
    } else {
      this.user.isPasswordNotSet = false;
      this.updateUser(response);
      return true;
    }
  }

  async sendConfirmationCode() {
    let result = true;
    lineLoadingViewModel.startLoading();

    const response: any | HttpError = await httpService.sendPost(
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
}

export const userViewModel = new UserViewModel();
