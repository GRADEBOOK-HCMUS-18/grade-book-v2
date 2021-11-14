import { makeAutoObservable } from 'mobx';
export class User {
  role: string = 'TEACHER' || 'STUDENT';
  email: string = '';
  username: string = '';
  studentID: string = '';
  profilePictureUrl: string = '';
  defaultAvatar: string = '';
  constructor() {
    makeAutoObservable(this);
  }
}
