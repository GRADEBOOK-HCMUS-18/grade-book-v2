import { lineLoadingViewModel } from 'shared/view-models';
import { httpService } from 'shared/services';
import { makeObservable, observable, action } from 'mobx';
import { ClassDetailInfo } from 'shared/models';
import { HttpError } from 'shared/errors';

class ClassDetailViewModel {
  classInfo: ClassDetailInfo = new ClassDetailInfo();

  constructor() {
    makeObservable(this, {
      classInfo: observable,
      updateClassInfo: action,
    });
  }

  updateClassInfo(data: ClassDetailInfo) {
    this.classInfo = data;
  }

  async getClassInfo(id: string): Promise<boolean> {
    this.classInfo = new ClassDetailInfo();
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
}

export const classDetailViewModel = new ClassDetailViewModel();
