import { User } from 'shared/models';

export class SingleClass {
  id: number = 0;
  roleOfCurrentUser: string = '';
  name: string = '';
  room: string = '';
  startDate: Date = new Date();
  description: string = '';
  mainTeacher: User = new User();
  inviteStringStudent: string = '';
  InviteStringTeacher: string = '';
}

export class ClassListResponse {
  classList: SingleClass[] = [];
}
