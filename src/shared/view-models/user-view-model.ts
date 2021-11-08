import { makeAutoObservable } from 'mobx';
import { User } from 'shared/models';
export class UserViewModel {
  private user: User = new User();

  constructor() {
    makeAutoObservable(this);
  }

  getUser() {
    return this.user;
  }

  isLogin() {
    return this.user.username !== '';
  }

  setAvatarColor(color: string) {
    this.user.avatarColor = color;
  }
}

export const userViewModel = new UserViewModel();
