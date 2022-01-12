import {User} from 'shared/models'
import { UserNotificationType } from 'shared/types';
import { Assignment } from './class-detail-info';
export class UserNotification {
    id: number = 0;
    dateTime: string ='';
    assignment: Assignment = new Assignment();
    class: {id:number,name :string} = {id:0, name :''};
    user?: User = new User();
    isViewed:boolean = false;
    review:any = null;
    notificationType:UserNotificationType = 'NewGradeReviewRequest';
}
