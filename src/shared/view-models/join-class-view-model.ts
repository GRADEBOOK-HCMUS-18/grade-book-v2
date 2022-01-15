import { action, makeObservable, observable } from 'mobx';
import { InvitationResponse } from 'pages/member-inviation/models';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { BaseViewModel } from './base-view-model';

class JoinClassViewModel extends BaseViewModel {
  invitedClassInfo: InvitationResponse = new InvitationResponse();
  isAlreadyInClass: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      invitedClassInfo: observable,
      isAlreadyInClass: observable,
      updateInvitedClassInfo: action,
    });
  }

  async getClassInfoByInviteId(inviteID: string) {
    const response: InvitationResponse | HttpError = await httpService.sendGet(
      `/invite/${inviteID}`,
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      return { isError: true, message: response.getMessage() };
    } else {
      this.updateInvitedClassInfo(response);
      return { isError: false, message: '' };
    }
  }

  async joinClass(inviteID: string) {
    const response: string | HttpError = await httpService.sendPost(
      `/invite/${inviteID}`,
      '',
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      return {
        isError: true,
        message: response.getMessage(),
      };
    } else {
      return { isError: false, message: '' };
    }
  }

  updateInvitedClassInfo(data: InvitationResponse) {
    this.invitedClassInfo = data;
    this.isAlreadyInClass = data.isAlreadyInClass;
  }
}

export const joinClassViewModel = new JoinClassViewModel();
