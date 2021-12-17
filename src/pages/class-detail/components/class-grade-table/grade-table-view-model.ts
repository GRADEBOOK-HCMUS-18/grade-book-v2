import { HttpError } from './../../../../shared/errors/http-error';
import { lineLoadingViewModel } from './../../../../shared/view-models/line-loading-view-model';
import { httpService } from './../../../../shared/services/http-service';
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

  async importStudentList(data: Array<Array<string>>, classId: number) {
    const body = this.prepareUploadStudentData(data);
    lineLoadingViewModel.startLoading();

    const response: any = await httpService.sendPost(
      `/Class/${classId}/student`,
      { students: body },
      httpService.getBearerToken()
    );

    lineLoadingViewModel.stopLoading();
    if (response instanceof HttpError) {
      this.makeError('Loi roi');
      return null;
    } else {
      return response;
    }
  }

  async importStudentGrade(fileType: string, file: File) {}

  prepareUploadStudentData(data: Array<Array<string>>) {
    const students: Array<{ studentId: string; fullName: string }> = [];
    data.forEach((element) =>
      students.push({
        studentId: element[0],
        fullName: element[1],
      })
    );
    return students;
  }
}
