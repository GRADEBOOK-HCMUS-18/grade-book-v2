import { BaseViewModel } from 'shared/view-models';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';

class CreateGradeReviewRequestViewModel extends BaseViewModel {
  async createNewGradeReviewRequest(params: any) {
    const { classId, assignmentId, description, requestedNewPoint } = params;

    this.startLoading();
    const response: any = await httpService.sendPost(
      `/Class/${classId}/assignment/${assignmentId}/review`,
      {
        requestedNewPoint: requestedNewPoint,
        description: description,
      },
      httpService.getBearerToken()
    );

    this.stopLoading();
    if (response instanceof HttpError) {
      this.makeError('Lỗi không gửi được. Vui lòng thử lại sau!');
      return false;
    } else {
      this.makeSuccess('Gửi đơn phúc khảo thành công.');
      return true;
    }
  }
}

export const createGradeReviewRequestViewModel =
  new CreateGradeReviewRequestViewModel();
