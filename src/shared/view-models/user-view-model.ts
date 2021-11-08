import { makeAutoObservable } from 'mobx';
export class UserViewModel {
  private role: string = 'TEACHER' || 'STUDENT';
  private email: string = '';
  private username: string = '';
  private studentID: string = '';

  constructor() {
    makeAutoObservable(this);
  }
}
