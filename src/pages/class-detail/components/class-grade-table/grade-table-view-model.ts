import { StudentGradeInfo } from 'shared/models/class-detail-info';
import { makeObservable } from 'mobx';
import { BaseViewModel } from 'shared/view-models';
import { fileService } from 'shared/services';

export class GradeTableViewModel extends BaseViewModel {
  studentGradeList: StudentGradeInfo[] = [];

  constructor() {
    super();
    makeObservable(this, {});
  }

  downloadTemplateFile(fileType: string): string {
    let output: string = '';
    if (fileType === 'xlsx') {
      //prepare data
      const data = null;

      output = JSON.stringify({ states: data }, null, 4);
    } else if (fileType === 'csv') {
      // Prepare data:
      let contents = [];
      contents.push(['studentId', 'fullname']);
      //prepare data
    }

    return output;
  }

  exportGradeCols(
    studentGradesInfo: StudentGradeInfo[],
    assignmentName: string,
    assignmentId: number,
    defaultFileType: string
  ) {
    const output = studentGradesInfo.reduce(function (
      obj: Array<Array<string>>,
      curVal: StudentGradeInfo,
      index: number
    ) {
      const point: string | undefined = curVal.grades
        .find((item) => item.assignmentId === assignmentId)
        ?.point.toString();
      const row: Array<string> = [curVal.studentId.toString()];
      if (point !== undefined) row.push(point);
      obj.push(row);
      return obj;
    },
    []);
    const headers: string[] = ['StudentId', assignmentName];

    fileService.writeFile(headers, output, assignmentName, defaultFileType);
  }

  async importStudentList(data: Array<Array<string>>) {}

  async importStudentGrade(fileType: string, file: File) {}
}
