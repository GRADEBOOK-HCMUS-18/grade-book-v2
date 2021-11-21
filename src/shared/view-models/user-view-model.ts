import { HttpError } from 'shared/errors';
import { makeObservable, observable, action } from 'mobx';
import { TOKEN_KEY } from 'shared/constants';
import { httpService, storageService } from 'shared/services';
import { UserStore } from 'shared/types';
import { User } from 'shared/models';
import { BaseViewModel } from './base-view-model';
export class UserViewModel extends BaseViewModel {
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
      displayName,
    } = user;

    const temp = new User();
    temp.profilePictureUrl = profilePictureUrl;
    temp.email = email;
    temp.fistName = firstName;
    temp.lastName = lastName;
    temp.defaultAvatar = defaultProfilePictureHex;
    temp.displayName = displayName;
    temp.isPasswordNotSet = isPasswordNotSet
      ? isPasswordNotSet
      : this.user.isPasswordNotSet;
    this.user = User.map(temp);
  }

  logout() {
    storageService.clearUser();
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

  async updateNewInfo(user: User): Promise<boolean> {
    const response: UserStore | HttpError = await httpService.sendPut(
      '/User',
      user,
      httpService.getBearerToken()
    );
    if (response instanceof HttpError) {
      return false;
    } else {
      this.updateUser(response);
      return true;
    }
  }
}

export const userViewModel = new UserViewModel();
