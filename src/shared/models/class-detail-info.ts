import { User } from './user';

export class Assignment {
  id: number = 0;
  name: string = '';
  point: number = 0;
}

export class GradeInfo {
  assignmentId: number = 0;
  point: number = 0;
  isFinal: boolean = false;
}

export class StudentGradeInfo {
  studentId: string | number = '';
  firstName: string = '';
  lastName: string = '';
  accountId: string | null = '';
  grades: GradeInfo[] = [];
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
  studentGrades: StudentGradeInfo[] = [];
}
