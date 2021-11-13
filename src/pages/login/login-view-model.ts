import { userViewModel } from './../../shared/view-models/user-view-model';
import { UserAuthen } from 'shared/types';
import { httpService, cryptoService } from 'shared/services';
import { BaseViewModel } from 'shared/view-models';

export class LoginViewModel extends BaseViewModel {
  async login(user: UserAuthen) {
    try {
      this.startLoading();
      const response = await httpService.sendPost('/login', user, '');
      console.log(response);

      this.stopLoading();
    } catch (error) {
      this.stopLoading();
      userViewModel.updateUser();
      // this.message = 'Không thể kết nối tới server';
      // this.isError = true;
    }
  }

  async register(user: UserAuthen) {
    this.startLoading();
    const response = await httpService.sendPost('/register', user, '');
    console.log(response);
    this.stopLoading();
  }
}
