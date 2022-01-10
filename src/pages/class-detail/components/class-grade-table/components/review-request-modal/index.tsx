import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Form, Card, Modal } from 'react-bootstrap';
import { ClassDetailInfo, GradeInfo } from 'shared/models';
import { Loading, PopupAlert, SnackBar } from 'shared/components';
import { createGradeReviewRequestViewModel } from './createGradeReviewRequestViewModel';
import { FormError } from './types';
import { getErrorsState, getErrors } from './helper';
import './style/index.css';

type FormValue = {
  description: string | undefined;
  requestedNewPoint: string;
};

interface IProps {
  classInfo: ClassDetailInfo;
  show: boolean;
  assignment: GradeInfo;
  onHide: () => void;
}

export const ReviewRequestModal = observer(
  ({ classInfo, show, onHide, assignment }: IProps) => {
    const [errors, setErrors] = useState<FormError[]>([]);
    const [formValue, setFormValue] = useState<FormValue>({
      description: '',
      requestedNewPoint: '0',
    });

    const history = useHistory();

    const handleFieldChange = (fieldName: string, newValue: any) => {
      setFormValue({ ...formValue, [fieldName]: newValue });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newErrors = getErrorsState(formValue);
      if (!newErrors.length) {
        const newValue: any = {
          classId: classInfo.id,
          assignmentId: assignment.assignmentId,
          description: formValue.description,
          requestedNewPoint: Number.parseFloat(formValue.requestedNewPoint),
        };

        await createGradeReviewRequestViewModel.createNewGradeReviewRequest(
          newValue
        );
        setFormValue({ description: '', requestedNewPoint: '0' });
      }
      setErrors(newErrors);
    };

    const { descriptionError, requestedNewPointError } = getErrors(errors);

    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            ĐƠN XIN PHÚC KHẢO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-0 d-flex-block">
            <div className="row d-flex justify-content-center ">
              <div className="col">
                <Card className="card-grade-review-request card-title-grade-review-request">
                  <Card.Header className="card-title-header-grade-review-request "></Card.Header>
                  <Card.Body>
                    <h3>
                      <strong className="text-uppercase">Phúc khảo</strong>
                    </h3>
                    <span>Điền nội dung phúc khảo của bạn</span>

                    <p className="my-0">
                      <strong className="text-uppercase">Cột điểm:</strong>{' '}
                      {assignment.assignmentName}
                    </p>
                    <p className="my-0">
                      <strong className="text-uppercase">Điểm hiện tại:</strong>{' '}
                      {assignment.studentPoint}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="row my-3 d-flex justify-content-center">
              <div className="col">
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
                            handleFieldChange(
                              'description',
                              event.target.value
                            );
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
              show={createGradeReviewRequestViewModel.isError}
              error={createGradeReviewRequestViewModel.isError}
              message={createGradeReviewRequestViewModel.message}
              onHide={() => {
                createGradeReviewRequestViewModel.deleteError();
              }}
            />
            <SnackBar
              type="success"
              onClose={() => createGradeReviewRequestViewModel.deleteSuccess()}
              show={createGradeReviewRequestViewModel.isSuccess}
              message={createGradeReviewRequestViewModel.message}
            />
            <Loading isLoading={createGradeReviewRequestViewModel.loading} />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);
