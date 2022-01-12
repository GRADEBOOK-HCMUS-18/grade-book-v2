import { UserNotification } from "shared/models";

export type UserNotificationType  = "NewFinalizedGradeComposition"|"NewGradeReviewRequest"| "NewGradeReviewReply"|"AcceptedOrRejectedGradeReview";

export type UserNotificationReponse ={
    numberOfNotViewedNotification:number ;
    pageNumber:number ;
    notifications:UserNotification[];
}
