import { observer } from 'mobx-react';
import { ClassDetailInfo } from 'shared/models';
import { ReviewDetail, ReviewList, GradeReviewRequestPage } from './components';
import { classGradeReviewViewModel } from './class-grade-review-view-model';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassGradeReview = observer(({ classInfo }: IProps) => {
  return (
    <div className="grade-review-container">
      <div className="grade-review-header"></div>
      <div className="grade-review-body">
        <ReviewList />
        <ReviewDetail />
      </div>
    </div>
    //<GradeReviewRequestPage classInfo={classInfo}></GradeReviewRequestPage>
  );
});
