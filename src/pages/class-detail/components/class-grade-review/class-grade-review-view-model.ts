import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { makeObservable, observable, action } from 'mobx';
import { GradeReview } from 'shared/models';
class ClassGradeReviewViewModel {
  gradeReviewList: Array<GradeReview> = [];
  dataVersion: number = 0;

  constructor() {
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
    const response: Array<GradeReview> | HttpError = await httpService.sendGet(
      `/Class/${classId}/review`,
      httpService.getBearerToken()
    );
    console.log(response);
    if (response instanceof HttpError) {
    } else {
      this.updateGradeReviewList(response);
    }
  }
}

export const classGradeReviewViewModel = new ClassGradeReviewViewModel();
