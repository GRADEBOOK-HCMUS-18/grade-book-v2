import { ReviewReply } from './../../../../shared/models/class-grade-review';
import { BaseViewModel, lineLoadingViewModel } from 'shared/view-models';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { makeObservable, observable, action } from 'mobx';
import { GradeReview } from 'shared/models';

class ClassGradeReviewViewModel extends BaseViewModel {
  gradeReviewList: Array<GradeReview> = [];
  isSendReply: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      gradeReviewList: observable,
      updateGradeReviewList: action,
      updateReply: action,
      updateReviewState: action,
    });
  }

  updateGradeReviewList(reviewList: Array<GradeReview>) {
    this.gradeReviewList = reviewList;
  }

  updateReply(reply: ReviewReply, reviewId: number) {
    const temp = [...this.gradeReviewList];
    const index = temp.findIndex((review) => review.id === reviewId);
    temp[index].replies.push(reply);
    this.gradeReviewList = temp;
  }

  updateReviewState(reviewId: number, type: 'rejected' | 'accepted') {
    const temp = [...this.gradeReviewList];
    const index = temp.findIndex((review) => review.id === reviewId);
    temp[index].state = type === 'rejected' ? 'Rejected' : 'Accepted';
    this.gradeReviewList = temp;
  }

  async getGradeReviewList(classId: number) {
    this.isSendReply = false;
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

  async sendReply(classId: number, reviewId: number, content: string) {
    this.isSendReply = true;
    lineLoadingViewModel.startLoading();
    const response: ReviewReply | HttpError = await httpService.sendPost(
      `/Class/${classId}/review/${reviewId}`,
      { content: content },
      httpService.getBearerToken()
    );
    lineLoadingViewModel.stopLoading();
    if (response instanceof HttpError) {
    } else {
      this.updateReply(response, reviewId);
    }
  }

  async changeStatus(
    type: 'rejected' | 'accepted',
    classId: number,
    reviewId: number
  ) {
    lineLoadingViewModel.startLoading();
    const response = await httpService.sendPut(
      `/Class/${classId}/review/${reviewId}`,
      { State: type },
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
    } else {
      this.updateReviewState(reviewId, type);
    }
    lineLoadingViewModel.stopLoading();
  }
}

export const classGradeReviewViewModel = new ClassGradeReviewViewModel();
