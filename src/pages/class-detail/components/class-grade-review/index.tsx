import { ReviewDetail, ReviewList } from './components';
import './style/index.css';

export const ClassGradeReview = () => {
  return (
    <div className="grade-review-container">
      <div className="grade-review-header"></div>
      <div className="grade-review-body">
        <ReviewList />
        <ReviewDetail />
      </div>
    </div>
  );
};
