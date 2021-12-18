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
