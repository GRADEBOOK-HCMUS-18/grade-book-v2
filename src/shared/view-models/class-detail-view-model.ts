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

  async getClassInfo(id: string) {
    lineLoadingViewModel.startLoading();
    const response: ClassDetailInfo | HttpError = await httpService.sendGet(
      `/Class/${id}`,
      httpService.getBearerToken()
    );
    if (response instanceof HttpError) {
    } else {
      this.updateClassInfo(response);
    }
    lineLoadingViewModel.stopLoading();
  }
}

export const classDetailViewModel = new ClassDetailViewModel();
