import { Assignment } from './../models/class-detail-info';
import { lineLoadingViewModel } from 'shared/view-models';
import { httpService } from 'shared/services';
import { makeObservable, observable, action, computed } from 'mobx';
import { ClassDetailInfo } from 'shared/models';
import { HttpError } from 'shared/errors';

class ClassDetailViewModel {
  classInfo: ClassDetailInfo = new ClassDetailInfo();

  constructor() {
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
}

export const classDetailViewModel = new ClassDetailViewModel();
