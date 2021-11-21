import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FormError, getErrors, getErrorsState } from './helper';
import './style/index.css';

interface IProps {
  show: boolean;
  onHide: () => void;
  onChange: (newPassword: string, oldPassword?: string) => void;
  isPasswordNotSet: boolean;
}

type FieldType = 'oldPassword' | 'newPassword';

const initState = {
  oldPassword: '',
  newPassword: '',
};
export const PasswordChangeModal = ({
  show,
  onChange,
  onHide,
  isPasswordNotSet,
}: IProps) => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [formValue, setFormValue] = useState(initState);

  const handleChangeField = (fieldName: FieldType, value: string) => {
    setFormValue({ ...formValue, [fieldName]: value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newErrors = getErrorsState(formValue);
    if (!newErrors.length) {
      onChange(formValue.newPassword, formValue.oldPassword);
    }
    setErrors(newErrors);
  };
  const { oldPassError, newPassError } = getErrors(errors);
  return (
    <Modal
      show={show}
      onHide={onHide}
      className="d-flex justify-content-center align-items-center"
    >
      <Modal.Header closeButton>
        <Modal.Title>Đổi mật khẩu</Modal.Title>
      </Modal.Header>
      <Form className="fill-form">
        <Modal.Body>
          {!isPasswordNotSet && (
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Mật khẩu cũ"
                onChange={(event) => {
                  handleChangeField('oldPassword', event.target.value);
                }}
                required
                isInvalid={!!oldPassError}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {oldPassError?.errorMessage}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <Form.Group>
            {!isPasswordNotSet && <Form.Label />}

            <Form.Control
              type="password"
              placeholder="Mật khẩu mới"
              onChange={(event) => {
                handleChangeField('newPassword', event.target.value);
              }}
              isInvalid={!!newPassError}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {newPassError?.errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
      </Form>
      <Modal.Footer>
        <div className="center-horizontal password-modal-btn">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="primary" type="submit">
            Đổi mật khẩu
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
