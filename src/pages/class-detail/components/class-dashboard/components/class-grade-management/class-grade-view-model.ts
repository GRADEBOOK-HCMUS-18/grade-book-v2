import { lineLoadingViewModel, classDetailViewModel } from 'shared/view-models';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { Assignment } from 'shared/models';

class ClassGradeViewModel {
  async reorderGradeStructure(order: number[]) {
    lineLoadingViewModel.startLoading();
    const { id } = classDetailViewModel.classInfo;

    const body = {
      assignmentIdPriorityOrder: order,
    };
    const response: Assignment[] | HttpError = await httpService.sendPut(
      `/class/${id}/assignment/priority`,
      body,
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      classDetailViewModel.makeError(
        'Đổi thứ tự không thành công, vui lòng thử lại sau'
      );
      lineLoadingViewModel.stopLoading();
      return false;
    } else {
      classDetailViewModel.updateAssignment(response);
      lineLoadingViewModel.stopLoading();
      return true;
    }
  }

  async addGradeCategory(value: Assignment) {
    const assignments = classDetailViewModel.getAssignMent;
    const { id } = classDetailViewModel.classInfo;
    lineLoadingViewModel.startLoading();
    const body: any = {
      name: value.name,
      point: value.point,
    };
    const response: Assignment | HttpError = await httpService.sendPost(
      `/class/${id}/assignment`,
      body,
      httpService.getBearerToken()
    );
    if (response instanceof HttpError) {
      classDetailViewModel.makeError(
        'Không thể tạo bài tập mới, vui lòng thử lại sau'
      );
      lineLoadingViewModel.stopLoading();
      return false;
    } else {
      const newArray = Array.from(assignments);
      newArray.push(response);
      classDetailViewModel.updateAssignment(newArray);

      lineLoadingViewModel.stopLoading();
      return true;
    }
  }

  async deleteGradeCategory(assignmentId: number) {
    const assignments = classDetailViewModel.getAssignMent;
    const { id } = classDetailViewModel.classInfo;
    const temp = assignments.find((item) => item.id === assignmentId);
    if (temp) {
      lineLoadingViewModel.startLoading();
      const index = assignments.indexOf(temp);
      const response: string | HttpError = await httpService.sendDelete(
        `/class/${id}/assignment/${assignmentId}`,
        httpService.getBearerToken()
      );
      if (response instanceof HttpError) {
        classDetailViewModel.makeError(
          'Không thể xóa bài tập, vui lòng thử lại sau'
        );
        lineLoadingViewModel.stopLoading();
        return false;
      } else {
        const newArray = Array.from(assignments);
        newArray.splice(index, 1);

        classDetailViewModel.updateAssignment(newArray);

        lineLoadingViewModel.stopLoading();
        return true;
      }
    }
  }

  async updateGradeCategory(assignmentId: number, updateValue: Assignment) {
    const assignments = classDetailViewModel.getAssignMent;
    const { id } = classDetailViewModel.classInfo;
    const temp = assignments.find((item) => item.id === assignmentId);
    if (temp) {
      lineLoadingViewModel.startLoading();
      const index = assignments.indexOf(temp);
      const body: any = { name: updateValue.name, point: updateValue.point };

      const response: Assignment | HttpError = await httpService.sendPut(
        `/class/${id}/assignment/${assignmentId}`,
        body,
        httpService.getBearerToken()
      );

      if (response instanceof HttpError) {
        classDetailViewModel.makeError(
          'Không thể thay đổi nội dung, vui lòng thử lại sau'
        );
        lineLoadingViewModel.stopLoading();
      } else {
        temp.name = updateValue.name;
        temp.point = updateValue.point;

        const newArray = Array.from(assignments);
        newArray.splice(index, 1, temp);
        classDetailViewModel.updateAssignment(newArray);
        lineLoadingViewModel.stopLoading();
        return false;
      }
    }
  }
}

export const classGradeViewModel = new ClassGradeViewModel();
