import { NotificationSpinner } from './../../layout/navbar/components/pop-over-user-notification/components/NotficationSpinner/index';
import { UserNotificationReponse } from 'shared/types';
import { action, makeObservable, observable } from 'mobx';
import { BaseViewModel, lineLoadingViewModel } from 'shared/view-models';
import { User, UserNotification } from 'shared/models';
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
    });
  }

  async getNotifications() {
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

  updateNotifications(newData: UserNotificationReponse) {
    //split data into reply notification and grade notification
    this.notifications = newData.notifications;
    this.pageNumber = newData.pageNumber + 1;
    this.numberOfNotViewedNotification = newData.numberOfNotViewedNotification;
  }

  pushNotifications(newData: UserNotificationReponse) {
    if (newData.notifications.length !== 0) {
      this.notifications.push(...newData.notifications);
      this.pageNumber = newData.pageNumber + 1;
    }
    else 
    {
        
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
    return false;
  }

  async markAsRead(): Promise<boolean> {
    return false;
  }
}

export const userNotificationsViewModel = new UserNotificationsViewModel();
