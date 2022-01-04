import { memo } from 'react';
import { classDetailViewModel } from 'shared/view-models';
import { Avatar } from 'shared/components';
import { GradeReview } from 'shared/models';
import './style/index.css';

interface IProps {
  reviewItem: GradeReview;
  selected: number;
  onClick: (item: GradeReview) => void;
}

export const ReviewItem = memo(({ reviewItem, selected, onClick }: IProps) => {
  const student = classDetailViewModel.classInfo.students.find(
    (student) => student.studentIdentification === reviewItem.student.studentId
  );

  return (
    <div
      onClick={() => onClick(reviewItem)}
      className={
        selected === reviewItem.id ? 'review-card-selected' : 'review-card'
      }
    >
      <div className="review-card-header">
        <div className="review-card-logo">
          {student && <Avatar user={student} />}
        </div>
        <div className="review-card-title">
          <span>
            {reviewItem.student.fullName} {reviewItem.student.studentId}{' '}
            {reviewItem.description}
          </span>
        </div>
      </div>
    </div>
  );
});
