import { action, observable, makeObservable, computed } from 'mobx';
import { BaseViewModel, lineLoadingViewModel } from 'shared/view-models';
import { SingleClass } from 'pages/home/models';
import { LOCAL_URL } from 'shared/constants';
import { httpService } from 'shared/services';
import { HttpError, HomepageError } from 'shared/errors';

class HomeViewModel extends BaseViewModel {
  allClass: SingleClass[] = [];
  invitationLink: string = '';
  classID: number = 0;
  isShowInvitationModal = false;

  constructor() {
    super();
    makeObservable(this, {
      allClass: observable,
      classID: observable,
      invitationLink: observable,
      isShowInvitationModal: observable,
      updateClassList: action,
      fetchAllClasses: action,
      handleError: action,
      setShowInvitationModal: action,
      setClassID: action,
      showInvitationLinkModal: action,
      copyTextToClipboard: action,
      getInviteStringStudent: computed,
    });
  }
  // Class List
  async fetchAllClasses() {
    lineLoadingViewModel.startLoading();

    const response: SingleClass[] | HttpError = await httpService.sendGet(
      '/class',
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      this.handleError(response);
      lineLoadingViewModel.stopLoading();
      return false;
    } else {
      this.updateClassList(response);
      lineLoadingViewModel.stopLoading();
      return true;
    }
  }

  handleError(response: HttpError) {
    const error: HomepageError = new HomepageError(response);
    this.makeError(error.getMessage());
  }

  updateClassList = (response: SingleClass[]) => {
    const newClassList: SingleClass[] = [];
    response.map((item) => {
      newClassList.unshift(item);
      return item;
    });
    this.allClass = response;
  };

  setShowInvitationModal(value: boolean) {
    this.isShowInvitationModal = value;
  }

  setClassID(value: number) {
    this.classID = value;
  }

  showInvitationLinkModal() {
    this.isShowInvitationModal = true;
    const filtered = this.allClass.filter((item) => item.id === this.classID);
    const inviteStringStudent: string = filtered.length
      ? filtered[0].inviteStringStudent
      : '';
    this.invitationLink = `${LOCAL_URL}/class/${this.classID}?invite=${inviteStringStudent}`;
  }

  get getInviteStringStudent() {
    const filtered = this.allClass.filter((item) => item.id === this.classID);
    const inviteStringStudent: string = filtered.length
      ? filtered[0].inviteStringStudent
      : '';
    return inviteStringStudent;
  }

  copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        this.message = 'Đã copy vào Clipboard thành công';
        setTimeout(() => this.deleteError(), 4000);
      },
      (err) => {
        this.message = 'Không thể copy vào Cliboard: ' + err;
        setTimeout(() => this.deleteError(), 4000);
      }
    );
  }
}

export const homeViewModel = new HomeViewModel();
