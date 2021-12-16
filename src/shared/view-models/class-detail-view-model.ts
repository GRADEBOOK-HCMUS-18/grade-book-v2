import { BaseViewModel } from './base-view-model';
import { Assignment } from 'shared/models';
import { lineLoadingViewModel } from 'shared/view-models';
import { httpService } from 'shared/services';
import { makeObservable, observable, action, computed } from 'mobx';
import { ClassDetailInfo } from 'shared/models';
import { HttpError } from 'shared/errors';
import { StudentGradeInfo } from 'shared/models/class-detail-info';

class ClassDetailViewModel extends BaseViewModel {
  classInfo: ClassDetailInfo = new ClassDetailInfo();

  constructor() {
    super();
    makeObservable(this, {
      classInfo: observable,
      updateClassInfo: action,
      updateAssignment: action,
      getAssignMent: computed,
    });
  }

  updateClassInfo(data: ClassDetailInfo) {
    this.classInfo = data;
  }

  get getAssignMent() {
    return this.classInfo.assignments;
  }

  get getStudentGrades (){
    return this.classInfo.studentGrades;
  }

  async getClassInfo(id: string): Promise<boolean> {
    lineLoadingViewModel.startLoading();
    const response: ClassDetailInfo | HttpError = await httpService.sendGet(
      `/Class/${id}`,
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      lineLoadingViewModel.stopLoading();
      return false;
    } else {
      this.updateClassInfo(response);
      lineLoadingViewModel.stopLoading();
      return true;
    }
  }

  updateAssignment(assignments: Assignment[]) {
    this.classInfo.assignments = assignments;
  }

  updateStudentGrade(studentGrades: StudentGradeInfo[]){
    this.classInfo.studentGrades = studentGrades;
  }
}

export const classDetailViewModel = new ClassDetailViewModel();
