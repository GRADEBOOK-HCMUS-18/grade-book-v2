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

  updateUser(user: UserStore) {
    console.log(user);
    const {
      firstName,
      lastName,
      email,
      profilePictureUrl,
      defaultProfilePictureHex,
    } = user;
    const temp = new User();
    temp.profilePictureUrl = profilePictureUrl;
    temp.email = email;
    temp.fistName = firstName;
    temp.lastName = lastName;
    temp.defaultAvatar = defaultProfilePictureHex;
    temp.displayName = user.displayName;
    temp.isPasswordNotSet = user.isPasswordNotSet;
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

  updateUserAvatar(avatar: string) {
    this.user.profilePictureUrl = avatar;
    this.user = User.map(this.user);
  }
}

export const userViewModel = new UserViewModel();
