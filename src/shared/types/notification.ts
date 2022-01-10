import { UserNotification } from "shared/models";

export type UserNotificationType  = "NewFinalizedGradeComposition"|"NewGradeReviewRequest"| "NewGradeReviewReply"|"AcceptedOrRejectedGradeReview";
export type ReplyNotificationType = "NewGradeReviewRequest"| "NewGradeReviewReply"|"AcceptedOrRejectedGradeReview";
export type GradeNotificationType = "NewFinalizedGradeComposition";

export type UserNotificationReponse ={
    numberOfNotViewedNotification:number ;
    pageNumber:number ;
    notifications:UserNotification[];
}
