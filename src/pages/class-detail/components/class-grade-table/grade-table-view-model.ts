import { action, makeObservable, observable, computed } from 'mobx';
import { HttpError } from 'shared/errors';
import { lineLoadingViewModel } from 'shared/view-models';
import { httpService } from 'shared/services';
import { StudentGradeInfo,Assignment } from 'shared/models';
import { BaseViewModel } from 'shared/view-models';
import { fileService } from 'shared/services';

class GradeTableViewModel extends BaseViewModel {
  studentGradeList: StudentGradeInfo[] = [];

  constructor() {
    super();
    makeObservable(this, {
      studentGradeList: observable,
      setStudentGrade: action,
      studentGrades: computed,
    });
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
      curVal: StudentGradeInfo
    ) {
      const point: string | undefined = curVal.grades
        .find((item) => item.assignmentId === assignmentId)
        ?.studentPoint?.toString();

      const row: Array<string> = [curVal.student.studentId.toString()];
      if (point !== undefined) row.push(point);

      obj.push(row);

      return obj;
    },
    []);
    const headers: string[] = ['StudentId', assignmentName];

    fileService.writeFile(headers, output, assignmentName, defaultFileType);
  }

  exportGradeTable(studentGradeInfo:StudentGradeInfo[], assignments:Assignment[],defaultFileType:string) {
    const headers = ['MSSV', 'Họ tên'];

    headers.push(...assignments.map((item) => item.name));

      const content = studentGradeInfo.map((item): Array<string> => {
        const data: Array<string> = [
          item.student.studentId.toString(),
          item.student.fullName,
        ];
        data.push(...item.grades.map(value =>value.studentPoint?value.studentPoint.toString():''));
        return data;
      });

      fileService.writeFile(headers, content, 'grade_table', defaultFileType);
  }

  get studentGrades() {
    return this.studentGradeList;
  }
  setStudentGrade(gradeList: StudentGradeInfo[]) {
    console.log(gradeList);
    this.studentGradeList = gradeList;
  }

  async getGradeTable(classId: number) {
    if (classId) {
      lineLoadingViewModel.startLoading();
      const response: StudentGradeInfo[] | HttpError =
        await httpService.sendGet(
          `/Class/${classId}/grade`,
          httpService.getBearerToken()
        );

      lineLoadingViewModel.stopLoading();
      if (response instanceof HttpError) {
        this.makeError('Loi roi');
        return null;
      } else {
        console.log(response);
        this.setStudentGrade(response);
      }
    }
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
      await this.getGradeTable(classId);
      return response;
    }
  }

  async importStudentGrade(
    data: Array<Array<string>>,
    classId: number,
    assignmentId: number
  ) {
    const body = this.prepareUploadGradeData(data);
    lineLoadingViewModel.startLoading();

    const response: any = await httpService.sendPost(
      `/Class/${classId}/assignment/${assignmentId}/grades`,
      { grades: body },
      httpService.getBearerToken()
    );

    lineLoadingViewModel.stopLoading();
    if (response instanceof HttpError) {
      this.makeError('Có lỗi xảy ra vui lòng thử lại sau');
      return null;
    } else {
      await this.getGradeTable(classId);
      return response;
    }
  }

  private prepareUploadStudentData(data: Array<Array<string>>) {
    const students: Array<{ studentId: string; fullName: string }> = [];
    data.forEach((element) =>
      students.push({
        studentId: element[0],
        fullName: element[1],
      })
    );
    return students;
  }

  private prepareUploadGradeData(data: Array<Array<string>>) {
    const grades: Array<{ studentId: string; grade: number }> = [];
    data.forEach((element) =>
      grades.push({
        studentId: element[0],
        grade: parseInt(element[1]),
      })
    );

    return grades;
  }
}

export const gradeTableViewModel = new GradeTableViewModel();
