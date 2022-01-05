import { BaseViewModel } from 'shared/view-models';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { makeObservable, observable, action } from 'mobx';
import { GradeReview } from 'shared/models';
class ClassGradeReviewViewModel extends BaseViewModel {
  gradeReviewList: Array<GradeReview> = [];
  dataVersion: number = 0;

  constructor() {
    super();
    makeObservable(this, {
      dataVersion: observable,
      notify: action,
    });
  }

  updateGradeReviewList(reviewList: Array<GradeReview>) {
    this.gradeReviewList = reviewList;

    this.notify();
  }

  notify() {
    this.dataVersion++;
  }

  async getGradeReviewList(classId: number) {
    this.startLoading();
    const response: Array<GradeReview> | HttpError = await httpService.sendGet(
      `/Class/${classId}/review`,
      httpService.getBearerToken()
    );
    this.stopLoading();
    if (response instanceof HttpError) {
    } else {
      this.updateGradeReviewList(response);
    }
  }
}

export const classGradeReviewViewModel = new ClassGradeReviewViewModel();
