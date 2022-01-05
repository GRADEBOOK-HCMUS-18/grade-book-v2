import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { useResponsive } from 'shared/hooks';
import { ClassDetailInfo, GradeReview, User } from 'shared/models';
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
  const [student, setStudent] = useState<User>(new User());

  const [showModal, setShowModal] = useState(false);

  const { isMobile } = useResponsive();
  //JUST FOR RERENDER
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const trigger = classGradeReviewViewModel.dataVersion;
  useEffect(() => {
    if (classInfo.id)
      classGradeReviewViewModel.getGradeReviewList(classInfo.id);
  }, [classInfo.id]);

  useEffect(() => {
    const { gradeReviewList } = classGradeReviewViewModel;
    if (gradeReviewList.length) {
      setReviewDetail(gradeReviewList[0]);
      const find = classInfo.students.find(
        (student) =>
          student.studentIdentification === gradeReviewList[0].student.studentId
      );
      if (find) {
        setStudent(find);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classGradeReviewViewModel.dataVersion]);

  const onSelect = useCallback(
    (item: GradeReview) => {
      setReviewDetail(item);
      const find = classInfo.students.find(
        (student) => student.studentIdentification === item.student.studentId
      );
      if (find) {
        setStudent(find);
      }
      if (isMobile) {
        setShowModal(true);
      }
    },
    [isMobile, classInfo.students]
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
          <ReviewDetail student={student} data={reviewDetail} />
        ) : (
          <ReviewDetailModal
            student={student}
            data={reviewDetail}
            onHide={onHide}
            show={showModal}
          />
        )}
      </div>
    </div>
  );
});
