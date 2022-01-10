import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { getPasswordError } from './helper';

interface IProps {
  fields: any;
  handleFieldChange: any;
  handleConfirmClick: any;
  isLoading?: boolean;
}

export const ResetPasswordForm = ({
  fields,
  handleFieldChange,
  handleConfirmClick,
  isLoading,
}: IProps) => {
  const [errorMessage, setErrorMessage] = useState<any>('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let message = '';
    if (fields.password !== fields.confirmPassword)
      message = 'Mật khẩu xác nhận không trùng khớp';
    message = getPasswordError(fields.password);
    if (message === '') {
      message = handleConfirmClick();
    }
    setErrorMessage(message);
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <h2 className="text-center">Nhập mật khẩu mới</h2>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              name="password"
              autoFocus
              type="password"
              value={fields.password}
              isInvalid={errorMessage !== ''}
              onChange={handleFieldChange}
              placeholder="Nhập mật khẩu mới"
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Xác nhận lại mật khẩu</Form.Label>
            <Form.Control
              name="confirmPassword"
              autoFocus
              type="password"
              value={fields.confirmPassword}
              isInvalid={errorMessage !== ''}
              onChange={handleFieldChange}
              placeholder="Nhập mật khẩu xác nhận"
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="my-3 btn-secondary"
            style={{ width: '100%' }}
            variant=""
            type="submit"
          >
            <div className="d-flex flex-row justify-content-center align-items-center">
              {isLoading && (
                <Spinner
                  className="my-2"
                  animation="border"
                  role="status"
                ></Spinner>
              )}
              <h3 className="ms-2 my-1 ">Thay đổi mật khẩu</h3>
            </div>
          </Button>
        </Form>
      </div>
    </div>
  );
};
