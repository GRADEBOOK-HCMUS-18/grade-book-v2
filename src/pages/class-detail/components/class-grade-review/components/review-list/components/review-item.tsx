import { memo, useMemo } from 'react';
import { classDetailViewModel } from 'shared/view-models';
import { Avatar } from 'shared/components';
import { GradeReview } from 'shared/models';
import './style/index.css';
import { stringToDateDisplay } from 'utils/date';

interface IProps {
  reviewItem: GradeReview;
  selected: number;
  onClick: (item: GradeReview) => void;
}

export const ReviewItem = memo(({ reviewItem, selected, onClick }: IProps) => {
  const student = classDetailViewModel.classInfo.students.find(
    (student) => student.studentIdentification === reviewItem.student.studentId
  );

  const statusDisplay = useMemo(() => {
    switch (reviewItem.state) {
      case 'Waiting':
        return <span className="review-status-waiting">Đang chờ</span>;
      case 'Accepted':
        return <span className="review-status-accepted">Chấp nhận</span>;
      case 'Rejected':
        return <span className="review-status-rejected">Từ chối</span>;
    }
  }, [reviewItem.state]);

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
            <b>Họ tên: </b>
            {reviewItem.student.fullName}, <b>MSSV: </b>
            {reviewItem.student.studentId}
          </span>
          <span>
            <b>Trạng thái:</b> {statusDisplay}
          </span>
          <span style={{ fontSize: 12 }}>
            {stringToDateDisplay(reviewItem.dateCreated)}
          </span>
        </div>
      </div>
    </div>
  );
});
