import { UserNotificationType } from "shared/types";

export const createURL = (notificationType:UserNotificationType,classId:number):string=>
{
    let url = '';
    switch (notificationType) {
        case 'AcceptedOrRejectedGradeReview':
            url = `class/${classId}/grade-reviews`;
            break;
        case 'NewFinalizedGradeComposition':
            url = `class/${classId}/grade-table`;
            break;
        case 'NewGradeReviewReply':
            url = `/class/${classId}/grade-reviews`;
            break;
        case 'NewGradeReviewRequest':
            url = `/class/${classId}/grade-reviews`;
            break;
        default:
            break;
    }
    return url;
}