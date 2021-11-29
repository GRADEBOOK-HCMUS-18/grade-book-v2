import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiFillSave } from 'react-icons/ai';
import { Assignment } from 'shared/models';
import { FormError } from './types';
import { getErrorsState, getErrors } from './helper';
import './style/index.css';

type FormType = 'create' | 'edit';

type FormValue = {
  id: any;
  name: any;
  point: any;
};

interface IProps {
  value?: FormValue;
  formType: FormType;
  handleDelete: any;
  handleUpdate: any;
  handleCreateNew: any;
}

export const GradeStructureForm = ({
  value,
  formType,
  handleDelete,
  handleUpdate,
  handleCreateNew,
}: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);

  const [formValue, setFormValue] = useState<FormValue>({
    id: value?.id,
    name: value?.name,
    point: value?.point,
  });

  const handleFieldChange = (fieldName: string, newValue: any) => {
    setFormValue({ ...formValue, [fieldName]: newValue });
  };

  const handleSaveItem = () => {
    const newErrors = getErrorsState(formValue);
    if (!newErrors.length) {
      const newValue: Assignment = {
        id: formValue.id,
        name: formValue.name,
        point: formValue.point,
      };
      handleUpdate(formValue.id, newValue);
      setIsEdit(false);
    }
    setErrors(newErrors);
  };

  const handleEditItem = () => {
    setIsEdit(true);
  };

  const handleDeleteItem = () => {
    handleDelete(formValue.id);
  };

  const { nameError, pointError } = getErrors(errors);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = getErrorsState(formValue);
    if (!newErrors.length) {
      const newValue: Assignment = {
        id: formValue.id,
        name: formValue.name,
        point: formValue.point,
      };
      handleCreateNew(newValue);
      setFormValue({ id: null, name: '', point: '' });
    }
    setErrors(newErrors);
  };

  return (
    <div className="row my-3 d-flex justify-content-center">
      <div className="col-9 col-lg-6">
        <div className="card-edit-grade card-detail-edit-grade">
          <div className="card-body pt-1">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                <div className="m-0 d-flex">
                  <span className="text-grade-name-edit-grade pt-2">
                    Tiêu đề
                  </span>

                  {formType === 'edit' ? (
                    <div className="ms-auto">
                      {isEdit ? (
                        <button
                          type="button"
                          className="btn-circle-edit-grade btn-success-edit-grade p-0"
                          onClick={handleSaveItem}
                        >
                          <AiFillSave size={18} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-circle-edit-grade btn-warning-edit-grade p-0"
                          onClick={handleEditItem}
                        >
                          <AiFillEdit size={18} />
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn-circle-edit-grade btn-danger-edit-grade p-0"
                        onClick={handleDeleteItem}
                      >
                        <AiFillDelete size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="ms-auto mt-1">
                      <button
                        className="btn-create-new-edit-grade "
                        type="submit"
                      >
                        <span className="text-uppercase">tạo mới</span>
                      </button>
                    </div>
                  )}
                </div>
                <Form.Control
                  type="text"
                  placeholder="Nhập nội dung"
                  name="name"
                  value={formValue.name}
                  onChange={(event: any) => {
                    handleFieldChange('name', event.target.value);
                  }}
                  isInvalid={!!nameError}
                  aria-describedby="name-help"
                  readOnly={!isEdit && formType === 'edit'}
                ></Form.Control>
                <Form.Control.Feedback type="invalid" className="my-0">
                  {nameError?.errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-grade-point-edit-grade my-0">
                  Điểm số
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập điểm số"
                  name="point"
                  value={formValue.point}
                  onChange={(event: any) => {
                    handleFieldChange('point', event.target.value);
                  }}
                  isInvalid={!!pointError}
                  readOnly={!isEdit && formType === 'edit'}
                  aria-describedby="name-help"
                ></Form.Control>
                <Form.Control.Feedback type="invalid" className="my-0">
                  {pointError?.errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
