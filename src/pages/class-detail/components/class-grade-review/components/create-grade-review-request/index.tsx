import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react';
import { Form, Card } from 'react-bootstrap';
import { ClassDetailInfo } from 'shared/models';
import { useQuery } from 'shared/hooks';
import { PopupAlert } from 'shared/components';
import { createGradeReviewRequestViewModel } from './createGradeReviewRequestViewModel';
import { FormError } from './types';
import { getErrorsState, getErrors, XORLogic } from './helper';
import './style/index.css';

type FormValue = {
  description: string | undefined;
  requestedNewPoint: string;
};

interface IProps {
  classInfo: ClassDetailInfo;
}

export const GradeReviewRequestPage = observer(({ classInfo }: IProps) => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [formValue, setFormValue] = useState<FormValue>({
    description: '',
    requestedNewPoint: '0',
  });
  const [gradeInfo, setGradeInfo] = useState<any>();
  const query = useQuery();
  const history = useHistory();

  const assignmentId = query.get('assignment');

  useEffect(() => {
    const assignment = classInfo.assignments.find(
      (item) => item.id.toString() === assignmentId
    );
    if (assignmentId !== null && assignment !== undefined) {
      createGradeReviewRequestViewModel.getGradeInfo(
        classInfo.id,
        assignmentId
      );
    } else {
      history.push(`/class/${classInfo.id}/grade-reviews`);
    }
  }, [assignmentId, classInfo.id]);

  useEffect(() => {
    const newGradeInfo =
      createGradeReviewRequestViewModel.studentGradeList.grades.find(
        (item) => item.assignmentId.toString() === assignmentId
      );
    setGradeInfo(newGradeInfo);
  }, [createGradeReviewRequestViewModel.studentGradeList]);

  const handleFieldChange = (fieldName: string, newValue: any) => {
    setFormValue({ ...formValue, [fieldName]: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = getErrorsState(formValue);
    if (!newErrors.length) {
      const newValue: any = {
        classId: classInfo.id,
        assignmentId: assignmentId,
        description: formValue.description,
        requestedNewPoint: Number.parseFloat(formValue.requestedNewPoint),
      };
      createGradeReviewRequestViewModel.createNewGradeReviewRequest(newValue);
      setFormValue({ description: '', requestedNewPoint: '0' });
      setTimeout(
        () => history.push(`/class/${classInfo.id}/grade-reviews`),
        2000
      );
    }
    setErrors(newErrors);
  };

  const { descriptionError, requestedNewPointError } = getErrors(errors);

  return (
    <div className="container p-0 mt-grade-review-request d-flex-block">
      <div className="row d-flex justify-content-center ">
        <div className="col-9 col-lg-6">
          <Card className="card-grade-review-request card-title-grade-review-request">
            <Card.Header className="card-title-header-grade-review-request "></Card.Header>
            <Card.Body>
              <h3>
                <strong className="text-uppercase">Phúc khảo</strong>
              </h3>
              <span>Điền nội dung phúc khảo của bạn</span>

              <p className="my-0">
                <strong className="text-uppercase">Cột điểm:</strong>{' '}
                {gradeInfo?.assignmentName}
              </p>
              <p className="my-0">
                <strong className="text-uppercase">Điểm hiện tại:</strong>{' '}
                {gradeInfo?.studentPoint}
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row my-3 d-flex justify-content-center">
        <div className="col-9 col-lg-6">
          <div className="card-grade-review-request card-detail-grade-review-request">
            <div className="card-body pt-1">
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                  <Form.Label className="text-grade-point-grade-review-request my-0">
                    Điểm số mong muốn
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập số điểm mong muốn"
                    name="point"
                    value={formValue.requestedNewPoint}
                    onChange={(event: any) => {
                      handleFieldChange(
                        'requestedNewPoint',
                        event.target.value
                      );
                    }}
                    isInvalid={!!requestedNewPointError}
                    aria-describedby="name-help"
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid" className="my-0">
                    {requestedNewPointError?.errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="form-group">
                  <label
                    htmlFor="descriptionTextarea"
                    className=" form-label text-grade-point-grade-review-request my-0"
                  >
                    Nội dung phúc khảo
                  </label>
                  <textarea
                    className={
                      descriptionError
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    rows={5}
                    id="descriptionTextarea"
                    placeholder="Nhập nội dung phúc khảo"
                    name="description"
                    value={formValue.description}
                    onChange={(event: any) => {
                      handleFieldChange('description', event.target.value);
                    }}
                    aria-describedby="name-help"
                  ></textarea>
                  <div className="invalid-feedback my-0">
                    {descriptionError?.errorMessage}
                  </div>
                </div>
                <div
                  className={
                    descriptionError
                      ? 'd-flex '
                      : 'd-flex mt-card-grade-review-request'
                  }
                >
                  <span></span>
                  <button
                    className="btn-create-new-grade-review-request  ms-auto"
                    type="submit"
                  >
                    <span className="text-uppercase">Gửi đơn</span>
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <PopupAlert
        show={XORLogic(
          createGradeReviewRequestViewModel.isError,
          createGradeReviewRequestViewModel.isSuccess
        )}
        //show={createGradeReviewRequestViewModel.isError}
        error={createGradeReviewRequestViewModel.isError}
        message={createGradeReviewRequestViewModel.message}
        onHide={() => {
          createGradeReviewRequestViewModel.deleteError();
          createGradeReviewRequestViewModel.deleteSuccess();
        }}
      />
    </div>
  );
});
