import { makeObservable, observable, action } from 'mobx';
import { TOKEN_KEY } from 'shared/constants';
import { storageService } from 'shared/services';
import { UserResponse } from 'shared/types';
import { User } from 'shared/models';
export class UserViewModel {
  private user: User = new User();
  dataVersion: number = 0;

  constructor() {
    makeObservable(this, {
      dataVersion: observable,
      updateUser: action,
      triggerChange: action,
    });
  }

  getUser() {
    return this.user;
  }

  isLogin() {
    return storageService.getLocalStorage(TOKEN_KEY) !== null;
  }

  updateUser(user: UserResponse) {
    this.user.username = user.username;
    this.user.profilePictureUrl = user.profilePictureUrl;
    this.user.email = user.email;
    this.user.defaultAvatar = user.defaultProfilePictureHex;
    this.triggerChange();
  }

  triggerChange() {
    if (this.dataVersion > 1) {
      this.dataVersion--;
    } else {
      this.dataVersion++;
    }
  }
}

export const userViewModel = new UserViewModel();
