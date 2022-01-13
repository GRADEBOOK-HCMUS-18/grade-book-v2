import { observer } from 'mobx-react-lite';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Loading, EmptyData } from 'shared/components';
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

  const { isBigScreen } = useResponsive();

  useEffect(() => {
    if (classInfo.id)
      classGradeReviewViewModel.getGradeReviewList(classInfo.id);
  }, [classInfo.id]);

  useEffect(() => {
    const { gradeReviewList, isSendReply } = classGradeReviewViewModel;
    if (gradeReviewList.length && !isSendReply) {
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
  }, [classInfo.students, classGradeReviewViewModel.gradeReviewList]);

  const onSelect = useCallback(
    (item: GradeReview) => {
      setReviewDetail(item);
      const find = classInfo.students.find(
        (student) => student.studentIdentification === item.student.studentId
      );
      if (find) {
        setStudent(find);
      }
      if (isBigScreen) {
        setShowModal(true);
      }
    },
    [classInfo.students, isBigScreen]
  );

  const onHide = useCallback(() => {
    setShowModal(false);
  }, []);

  const onSendReply = useCallback(
    (content: string) => {
      classGradeReviewViewModel.sendReply(
        classInfo.id,
        reviewDetail.id,
        content
      );
    },
    [reviewDetail.id, classInfo.id]
  );

  const onChangeStatus = useCallback(
    (type: 'rejected' | 'accepted') => {
      classGradeReviewViewModel.changeStatus(
        type,
        classInfo.id,
        reviewDetail.id
      );
    },
    [reviewDetail.id, classInfo.id]
  );

  return (
    <div className="grade-review-container">
      {classGradeReviewViewModel.gradeReviewList.length === 0 ? (
        <EmptyData
          src="preview-svgrepo-com.svg"
          message="Bạn chưa có bài tập nào."
        />
      ) : (
        <Fragment>
          <Loading isLoading={classGradeReviewViewModel.loading} />
          <div className="grade-review-body">
            <ReviewList
              isOwner={classInfo.isTeacher}
              onSelect={onSelect}
              reviewList={classGradeReviewViewModel.gradeReviewList}
            />
            {!isBigScreen ? (
              <ReviewDetail
                onSendReply={onSendReply}
                isOwner={classInfo.isTeacher}
                student={student}
                onChangeStatus={onChangeStatus}
                data={reviewDetail}
              />
            ) : (
              <ReviewDetailModal
                onSendReply={onSendReply}
                isOwner={classInfo.isTeacher}
                student={student}
                data={reviewDetail}
                onHide={onHide}
                show={showModal}
                onChangeStatus={onChangeStatus}
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
});
