import { observable, makeObservable, action, computed } from 'mobx';
import {
  BaseViewModel,
  lineLoadingViewModel,
  userViewModel,
} from 'shared/view-models';
import { User } from 'shared/models';
import { SingleClass } from 'pages/home/models';
import { httpService } from 'shared/services';
import { HttpError, InvitationError } from 'shared/errors';
import { InvitationResponse } from './models';

export class MemberInvitationViewModel extends BaseViewModel {
  user: User = new User();
  inviteID: string | null = '';
  isAlreadyInClass: boolean = false;
  currentRoleInClass: string = '';
  isTeacherInvitation: false = false;
  classInformation: SingleClass = new SingleClass();
  dataVersion: number = 0;

  constructor() {
    super();
    makeObservable(this, {
      user: observable,
      inviteID: observable,
      isAlreadyInClass: observable,
      currentRoleInClass: observable,
      isTeacherInvitation: observable,
      classInformation: observable,
      dataVersion: observable,

      joinClass: action,
      getUser: action,
      getClassInfo: action,
      updateInfo: action,
      handleError: action,
      raiseError: action,

      getClassDetailUrl: computed,
    });
  }

  //get user from local storage
  getUser() {
    this.user = userViewModel.user;
    return this.user;
  }

  get getClassDetailUrl() {
    return `/class/${this.classInformation.id}`;
  }

  //inviteID
  setInviteID(value: string | null) {
    this.inviteID = value;
  }

  //fetch class info
  async getClassInfo() {
    this.startLoading();
    const response: InvitationResponse | HttpError = await httpService.sendGet(
      `/invite/${this.inviteID}`,
      httpService.getBearerToken()
    );
    this.stopLoading();

    if (response instanceof HttpError) {
      this.handleError(response);
      return { isError: true, isAlreadyInClass: false };
    } else {
      this.updateInfo(response);
      return { isError: false, isAlreadyInClass: response.isAlreadyInClass };
    }
  }

  updateInfo(response: InvitationResponse) {
    this.isAlreadyInClass = response.isAlreadyInClass;
    this.isTeacherInvitation = response.isTeacherInvitation;
    this.classInformation = response.classInformation;
    this.classInformation.mainTeacher = response.classInformation.mainTeacher;
    this.currentRoleInClass = response.currentRoleInClass;
    this.triggerChange();
  }

  triggerChange() {
    if (this.dataVersion > 1) {
      this.dataVersion--;
    } else {
      this.dataVersion++;
    }
  }
  //error
  handleError(response: HttpError) {
    const error: InvitationError = new InvitationError(response);
    this.makeError(error.getMessage());
  }

  raiseError() {
    if (this.currentRoleInClass && this.isAlreadyInClass) {
      const message: string = 'User already joined this class';
      const error: InvitationError = new InvitationError(
        new HttpError(),
        message
      );
      this.makeError(error.getMessage());
    }
  }

  //join class

  async joinClass() {
    lineLoadingViewModel.startLoading();
    const response: string | HttpError = await httpService.sendPost(
      `/invite/${this.inviteID}`,
      '',
      httpService.getBearerToken()
    );
    lineLoadingViewModel.stopLoading();
    if (response instanceof HttpError) {
      const message: string = "This user don't allow to join this class";
      const error: InvitationError = new InvitationError(
        new HttpError(),
        message
      );
      this.makeError(error.getMessage());
      return false;
    } else {
      return true;
    }
  }
}
