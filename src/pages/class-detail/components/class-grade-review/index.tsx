import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { useResponsive } from 'shared/hooks';
import { ClassDetailInfo, GradeReview } from 'shared/models';
import { classGradeReviewViewModel } from './class-grade-review-view-model';
import { ReviewDetail, ReviewDetailModal, ReviewList } from './components';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassGradeReview = observer(({ classInfo }: IProps) => {
  const [reviewDetail, setReviewDetail] = useState<GradeReview>(
    new GradeReview()
  );

  const [showModal, setShowModal] = useState(false);

  const { isMobile } = useResponsive();
  //JUST FOR RERENDER
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const trigger = classGradeReviewViewModel.dataVersion;
  useEffect(() => {
    if (classInfo.id)
      classGradeReviewViewModel.getGradeReviewList(classInfo.id);
  }, [classInfo.id]);

  const onSelect = useCallback(
    (item: GradeReview) => {
      setReviewDetail(item);
      if (isMobile) {
        setShowModal(true);
      }
    },
    [isMobile]
  );

  const onHide = useCallback(() => {
    setShowModal(false);
  }, []);
  return (
    <div className="grade-review-container">
      <div className="grade-review-header"></div>
      <div className="grade-review-body">
        <ReviewList
          onSelect={onSelect}
          reviewList={classGradeReviewViewModel.gradeReviewList}
        />
        {!isMobile ? (
          <ReviewDetail data={reviewDetail} />
        ) : (
          <ReviewDetailModal
            data={reviewDetail}
            onHide={onHide}
            show={showModal}
          />
        )}
      </div>
    </div>
  );
});
