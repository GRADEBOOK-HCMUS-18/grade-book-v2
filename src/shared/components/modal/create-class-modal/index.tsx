import { useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Button } from 'react-bootstrap';
import { classActionViewModel } from 'shared/view-models';
import { homeViewModel } from 'pages/home/home-view-model';
import { CreateClassViewModel } from './create-class-view-model';
import { CreateClassForm } from './models';
import { FormError } from './components/types';
import { getErrors, getErrorsState } from './components/helper';
import './style/index.css';

const CreateClassModal = observer(() => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [formValue, setFormValue] = useState<any>(new CreateClassForm());
  const [viewModel] = useState(new CreateClassViewModel());

  const showModal = classActionViewModel.showCreateClassModal;

  const hideDialog = () => {
    classActionViewModel.setShowCreateClassModal(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = getErrorsState(formValue);

    if (!newErrors.length) {
      classActionViewModel.setShowCreateClassModal(false);
      await viewModel.createClass(formValue);
      setFormValue([]);
      await homeViewModel.fetchAllClasses();
    }
    setErrors(newErrors);
  };

  const handleFieldChange = (
    fieldName: FormError['errorType'],
    value: string
  ) => {
    const state = { ...formValue };
    state[fieldName] = value;
    setFormValue(state);
  };

  const { nameError } = getErrors(errors);

  return (
    <Modal
      show={showModal}
      onHide={hideDialog}
      className="d-flex justify-content-center align-items-center"
    >
      <Modal.Header closeButton>
        <Modal.Title>Tạo lớp học</Modal.Title>
      </Modal.Header>
      <Form className="fill-form" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Tên lớp học (bắt buộc)"
              name="name"
              value={formValue.name}
              isInvalid={!!nameError}
              onChange={(event: any) => {
                handleFieldChange('name', event.target.value);
              }}
              aria-describedby="title-help"
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              {nameError?.errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Phòng"
              name="room"
              value={formValue.room}
              onChange={(event: any) => {
                handleFieldChange('room', event.target.value);
              }}
              aria-describedby="title-help"
              className="mt-2"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Mô tả"
              name="description"
              value={formValue.description}
              onChange={(event: any) => {
                handleFieldChange('description', event.target.value);
              }}
              aria-describedby="title-help"
              className="mt-2"
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Tạo lớp
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
});

export { CreateClassModal };
