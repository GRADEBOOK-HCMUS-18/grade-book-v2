interface StudentInfo {
  studentId: string;
  fullName: string;
}

export class GradeInfo {
  assignmentId: number = 0;
  assignmentName: string = '';
  assignmentWeight: number = 0;
  studentPoint: number | null = null;
  isFinal: boolean = false;
}

export class StudentGradeInfo {
  student: StudentInfo = {
    studentId: '0',
    fullName: '',
  };
  grades: GradeInfo[] = [];
}
