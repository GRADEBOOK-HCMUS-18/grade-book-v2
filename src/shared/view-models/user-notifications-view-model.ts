import { UserNotificationReponse } from 'shared/types';
import { action, makeObservable, observable } from 'mobx';
import { BaseViewModel, lineLoadingViewModel } from 'shared/view-models';
import { UserNotification } from 'shared/models';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';

class UserNotificationsViewModel extends BaseViewModel {
  notifications: Array<UserNotification> = [];
  notificationPerPage: number = 5;
  pageNumber: number = 1;
  numberOfNotViewedNotification: number = 0;

  constructor() {
    super();
    makeObservable(this, {
      numberOfNotViewedNotification: observable,
      notifications: observable,
      updateNotifications: action,
      pushNotifications: action,
      updateAllNotificationsRead:action,
      setDefaultPropertyValues:action,
    });
  }

  async getNotifications() {
    this.setDefaultPropertyValues();
    lineLoadingViewModel.startLoading();
    const response: UserNotificationReponse | HttpError =
      await httpService.sendGet(
        `/notification?notificationPerPage=${this.notificationPerPage}&pageNumber=${this.pageNumber}`,
        httpService.getBearerToken()
      );

    if (response instanceof HttpError) {
      lineLoadingViewModel.stopLoading();
      this.makeError('Lỗi rồi');
      return false;
    } else {
      this.updateNotifications(response);
      lineLoadingViewModel.stopLoading();
      return true;
    }
  }

  async fetchMoreNotifications(): Promise<boolean> {
    lineLoadingViewModel.startLoading();
    const response: UserNotificationReponse | HttpError =
      await httpService.sendGet(
        `/notification?notificationPerPage=${this.notificationPerPage}&pageNumber=${this.pageNumber}`,
        httpService.getBearerToken()
      );

    if (response instanceof HttpError) {
      lineLoadingViewModel.stopLoading();
      this.makeError('Lỗi rồi');
      return false;
    } else {
      this.pushNotifications(response);
      lineLoadingViewModel.stopLoading();
      return true;
    }
  }

  async markAsReadAll(): Promise<boolean> {
    const response: string | HttpError = await httpService.sendPut(
      `/notification`,
      {},
      httpService.getBearerToken()
    );

    if (response instanceof HttpError) {
      this.makeError('Lỗi rồi. Vui lòng thử lại sau.');
      return false;
    } else {
      this.updateAllNotificationsRead();
      return true;
    }
  }

  async markAsRead(notificationId: number): Promise<boolean> {
    if (this.isReadNotification(notificationId)) {
      const response: string | HttpError = await httpService.sendPut(
        `/notification/${notificationId}`,
        {},
        httpService.getBearerToken()
      );

      if (response instanceof HttpError) {
        this.makeError('Lỗi rồi. Vui lòng thử lại sau.');
        return false;
      } else {
        this.updateSingleNotificionRead(notificationId)
        return true;
      }
    }
    return false;
  }

  isReadNotification(notificationId: number): boolean {
    let res: boolean = false;
    const foundNotification = this.notifications.find(
      (item) => item.id === notificationId
    );
    if (
      typeof foundNotification !== 'undefined' &&
      foundNotification?.isViewed === false
    ) {
      res = true;
    }
    return res;
  }
  
  updateNotifications(newData: UserNotificationReponse) {
    this.notifications = newData.notifications;
    this.pageNumber = newData.pageNumber + 1;
    this.numberOfNotViewedNotification = newData.numberOfNotViewedNotification;
  }

  pushNotifications(newData: UserNotificationReponse) {
    if (newData.notifications.length !== 0) {
      this.notifications.push(...newData.notifications);
      this.pageNumber = newData.pageNumber + 1;
    }
  }

  setDefaultPropertyValues()
  {
    this.pageNumber = 1;
    this.notificationPerPage=5;
    this.numberOfNotViewedNotification = 0;
    this.notifications = [];
  }

  updateAllNotificationsRead() {
    this.notifications = this.notifications.map((item) => {
      item.isViewed = true;
      return item;
    });
    this.numberOfNotViewedNotification = 0;
  }

  updateSingleNotificionRead(notificationId:number){
    const foundNotification = this.notifications.find(
      (item) => item.id === notificationId
    );
    if (
      typeof foundNotification !== 'undefined' &&
      foundNotification?.isViewed === false
    ) {
      foundNotification.isViewed =true;
      if(this.numberOfNotViewedNotification>0)
        this.numberOfNotViewedNotification--;
    }
  }
}

export const userNotificationsViewModel = new UserNotificationsViewModel();
