import { UserNotificationType } from 'shared/types';
import { Assignment } from "shared/models";

export const generateNotificationMessage = (notificationType:UserNotificationType, classInfo?:any, assignment?:Assignment)=>
{
    switch(notificationType)
    {
        case "NewGradeReviewRequest":
            return `Bạn có yêu cầu phúc khảo ${assignment?.name}`
        case 'NewFinalizedGradeComposition':
            return `Đã có điểm ${assignment?.name}. Vào xem ngay`
        case 'AcceptedOrRejectedGradeReview':
            return `Giáo viên đã phản hồi kết quả phúc khảo ${assignment?.name}.`
        case 'NewGradeReviewReply':
            return `Giáo viên đã trả lời yêu cầu phúc khảo ${assignment?.name} của bạn.`
        default:
            return '';
    }
}