import { User } from './user';

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
}

export class GradeCategory {
  id: number=0;
  title: string = '';
  grade: string = '';
}