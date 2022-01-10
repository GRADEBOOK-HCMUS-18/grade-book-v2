import { makeObservable, observable,action } from 'mobx';
import { lineLoadingViewModel, BaseViewModel } from 'shared/view-models';
import { StudentGradeInfo } from 'shared/models';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';

class CreateGradeReviewRequestViewModel extends BaseViewModel {
  studentGradeList:StudentGradeInfo =new StudentGradeInfo();
  
  constructor() {
    super();
    makeObservable(this, {
      studentGradeList :observable,
      setStudentGrade:action,
    })
  }

  setStudentGrade(gradeList:  StudentGradeInfo) {
    this.studentGradeList = gradeList;
  }

  async getGradeInfo(classId:number, assignmentId:string)
  {
    if (classId) {
      lineLoadingViewModel.startLoading();
      const response:  StudentGradeInfo | HttpError =
        await httpService.sendGet(
          `/Class/${classId}/grade`,
          httpService.getBearerToken()
        );

      lineLoadingViewModel.stopLoading();
      if (response instanceof HttpError) {
        this.makeError('Lỗi rồi');
        return false;
      } else {
        this.setStudentGrade(response);
        return true;
      }
    }
  }

  async createNewGradeReviewRequest(params: any) {
    const { classId, assignmentId, description, requestedNewPoint } = params;

    lineLoadingViewModel.startLoading();
    const response: any = await httpService.sendPost(
      `/Class/${classId}/assignment/${assignmentId}/review`,
      {
        requestedNewPoint: requestedNewPoint,
        description: description,
      },
      httpService.getBearerToken()
    );

    lineLoadingViewModel.stopLoading();
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
