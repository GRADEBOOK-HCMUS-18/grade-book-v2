import { makeAutoObservable } from 'mobx';
export class User {
  role: string = 'TEACHER' || 'STUDENT';
  email: string = '';
  username: string = '';
  studentID: string = '';
  imageUrl: string = '';
  avatarColor: string = '';
  defaultAvatar: string = '';
  constructor() {
    makeAutoObservable(this);
  }
}
