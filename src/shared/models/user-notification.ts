import {User} from 'shared/models'

export class UserNotification {
    notificationId: string = '';
    user: User = new User();
    classId:number = 0;
    className:string = '';
    assignmentName?:string = '';//finlize either all assignments or a single assignment
    createdAt: Date = new Date(Date.now());
    isRead:boolean = false;
    type: number = 0;
}

