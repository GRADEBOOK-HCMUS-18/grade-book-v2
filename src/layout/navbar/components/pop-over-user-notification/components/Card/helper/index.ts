import { UserNotificationType } from 'shared/types';
import {User, Assignment } from "shared/models";

export const generateNotificationMessage = (notificationType:UserNotificationType, classInfo?:any, assignment?:Assignment, user?:User)=>
{
    switch(notificationType)
    {
        case "NewGradeReviewRequest":
            return `Bạn có yêu cầu phúc khảo ${assignment?.name} từ sinh viên ${user?.displayName}.`
            break;
        case 'NewFinalizedGradeComposition':
            return `Đã có điểm ${assignment?.name}. Vào xem ngay`
            break;
        case 'AcceptedOrRejectedGradeReview':
            return `Giáo viên đã phản hồi kết quả phúc khảo ${assignment?.name}.`
            break;
        case 'NewGradeReviewReply':
            return `Giáo viên đã trả lời yêu cầu phúc khảo ${assignment?.name} của bạn.`
            break;
        default:
            return '';
            break;
    }
}