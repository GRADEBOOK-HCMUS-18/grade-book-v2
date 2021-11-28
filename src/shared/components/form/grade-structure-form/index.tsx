import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiFillSave } from 'react-icons/ai';
import { GradeCategory } from 'shared/models';
import { FormError } from './components/types';
import { getErrorsState, getErrors } from './components/helper';
import './style/index.css';

type FormType = 'create' | 'edit';

type FormValue = {
  id: any;
  title: any;
  grade: any;
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
    title: value?.title,
    grade: value?.grade,
  });

  const handleFieldChange = (fieldName: string, newValue: any) => {
    setFormValue({ ...formValue, [fieldName]: newValue });
  };

  const handleSaveItem = () => {
    const newErrors = getErrorsState(formValue);
    if (!newErrors.length) {
      const newValue: GradeCategory = {
        id: formValue.id,
        title: formValue.title,
        grade: formValue.grade,
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

  const { titleError, gradeError } = getErrors(errors);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = getErrorsState(formValue);
    if (!newErrors.length) {
      const newValue: GradeCategory = {
        id: formValue.id,
        title: formValue.title,
        grade: formValue.grade,
      };
      handleCreateNew(newValue);
      setFormValue({ id: null, title: '', grade: '' });
    }
    setErrors(newErrors);
  };

  return (
    <div className="row my-3 d-flex justify-content-center">
      <div className="col-9 col-lg-6">
        <div className="card card-detail">
          <div className="card-body pt-1">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                <div className="m-0 d-flex">
                  <span className="text-grade-title pt-2">Tiêu đề</span>

                  {formType === 'edit' ? (
                    <div className="ms-auto">
                      {isEdit ? (
                        <button
                          type="button"
                          className="btn-circle btn-success p-0"
                          onClick={handleSaveItem}
                        >
                          <AiFillSave size={18} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-circle btn-warning p-0"
                          onClick={handleEditItem}
                        >
                          <AiFillEdit size={18} />
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn-circle btn-danger p-0"
                        onClick={handleDeleteItem}
                      >
                        <AiFillDelete size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="ms-auto mt-1">
                      <button className="btn-create-new " type="submit">
                        <span className="text-uppercase">tạo mới</span>
                      </button>
                    </div>
                  )}
                </div>
                <Form.Control
                  type="text"
                  placeholder="Nhập nội dung"
                  name="title"
                  value={formValue.title}
                  onChange={(event: any) => {
                    handleFieldChange('title', event.target.value);
                  }}
                  isInvalid={!!titleError}
                  aria-describedby="title-help"
                  readOnly={!isEdit && formType === 'edit'}
                ></Form.Control>
                <Form.Control.Feedback type="invalid" className="my-0">
                  {titleError?.errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-grade-point my-0">
                  Điểm số
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập điểm số"
                  name="grade"
                  value={formValue.grade}
                  onChange={(event: any) => {
                    handleFieldChange('grade', event.target.value);
                  }}
                  isInvalid={!!gradeError}
                  readOnly={!isEdit && formType === 'edit'}
                  aria-describedby="title-help"
                ></Form.Control>
                <Form.Control.Feedback type="invalid" className="my-0">
                  {gradeError?.errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
