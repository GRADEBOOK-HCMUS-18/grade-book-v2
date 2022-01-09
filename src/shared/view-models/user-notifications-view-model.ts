import { action, makeObservable, observable,  } from 'mobx';
import { BaseViewModel } from 'shared/view-models';
import { User,UserNotification } from 'shared/models';

class UserNotificationsViewModel extends BaseViewModel{
    notifications:Array<UserNotification> = [];

    constructor() {
        super();
        makeObservable(this, {
            notifications:observable,
            updateNotifications:action,
        });
    }

    async getNotifications():Promise<Array<UserNotification>>
    {
        return [new UserNotification()];
    }

    async updateNotifications(newData: Array<UserNotification>)
    {
        this.notifications = newData;
    }

    async fetchMoreNotifications(): Promise<boolean> {
        return false;
    }

    async markAsReadAll(): Promise<boolean> {
        return false;
    }

    async markAsRead():Promise<boolean>
    {
        return false;
    }


}

export const userNotificationsViewModel = new UserNotificationsViewModel();