import { User } from './user';

export class Assignment {
  id: number = 0;
  name: string = '';
  point: number = 0;
}

export class ClassDetailInfo {
  id: number = 0;
  name: string = '';
  description: string = '';
  mainTeacher: User = new User();
  room: string = '';
  startDate: Date = new Date();
  students: User[] = [];
  subTeachers: User[] = [];
  isTeacher: boolean = false;
  inviteStringStudent: string = '';
  inviteStringTeacher: string = '';
  assignments: Assignment[] = [];
}
