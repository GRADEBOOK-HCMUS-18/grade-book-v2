import { memo, useEffect, useState } from 'react';
import { GradeReview } from 'shared/models';
import { ReviewItem } from './components/review-item';
import './style/index.css';

interface IProps {
  reviewList: Array<GradeReview>;
  onSelect: (review: GradeReview) => void;
}

export const ReviewList = memo(({ reviewList, onSelect }: IProps) => {
  const [selectedReview, setSelectedReview] = useState(0);

  useEffect(() => {
    if (reviewList.length) setSelectedReview(reviewList[0].id);
  }, [reviewList]);

  const handleReviewClick = (item: GradeReview) => {
    setSelectedReview(item.id);
    onSelect(item);
  };
  return (
    <div className="review-list">
      <h2>Danh sach phuc khao</h2>
      {reviewList.map((item) => (
        <ReviewItem
          onClick={handleReviewClick}
          key={item.id}
          selected={selectedReview}
          reviewItem={item}
        />
      ))}
    </div>
  );
});
