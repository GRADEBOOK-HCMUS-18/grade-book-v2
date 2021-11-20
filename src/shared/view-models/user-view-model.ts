import { HttpError } from 'shared/errors';
import { makeObservable, observable, action } from 'mobx';
import { TOKEN_KEY } from 'shared/constants';
import { httpService, storageService } from 'shared/services';
import { UserStore } from 'shared/types';
import { User } from 'shared/models';
export class UserViewModel {
  private user: User = new User();
  dataVersion: number = 0;

  constructor() {
    makeObservable(this, {
      dataVersion: observable,
      updateUser: action,
      triggerChange: action,
      changeAvatar: action,
    });
  }

  getUser() {
    return this.user;
  }

  isLogin() {
    return storageService.getLocalStorage(TOKEN_KEY) !== null;
  }

  updateUser(user: UserStore) {
    const {
      firstName,
      lastName,
      email,
      profilePictureUrl,
      defaultProfilePictureHex,
    } = user;
    this.user.profilePictureUrl = profilePictureUrl;
    this.user.email = email;
    this.user.fistName = firstName;
    this.user.lastName = lastName;
    this.user.defaultAvatar = defaultProfilePictureHex;
    this.user.displayName = user.displayName;
    this.triggerChange();
  }

  triggerChange() {
    if (this.dataVersion > 1) {
      this.dataVersion--;
    } else {
      this.dataVersion++;
    }
  }

  logout() {
    storageService.clearUser();
  }

  async changeAvatar(data: any) {
    const response: { profilePictureUrl: string } | HttpError =
      await httpService.sendFile(
        '/User/avatar',
        'PUT',
        data,
        httpService.getBearerToken()
      );
    if (response instanceof HttpError) {
      alert('looix');
    }
  }
}

export const userViewModel = new UserViewModel();
