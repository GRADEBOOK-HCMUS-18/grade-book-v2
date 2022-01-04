type CurrentGrade = {
  studentId: string;
  point: number;
  isFinalized: boolean;
};

type StudentShortInfo = {
  studentId: string;
  fullName: string;
};

export class GradeReview {
  id: number = 0;
  requestedNewPoint: number = 0;
  description: string = '';
  state: string = '';
  currentGrade: CurrentGrade = { studentId: '', point: 0, isFinalized: false };
  student: StudentShortInfo = { studentId: '', fullName: '' };
  replies: Array<any> = [];
}

//  {
//         "id": 1,
//         "requestedNewPoint": 70,
//         "description": "I want to raise my point",
//         "state": "Waiting",
//         "currentGrade": {
//             "studentId": "12345",
//             "point": 30,
//             "isFinalized": true
//         },
//         "student": {
//             "studentId": "12345",
//             "fullName": "Nguyen Van A"
//         },
//         "replies": []
//     }
