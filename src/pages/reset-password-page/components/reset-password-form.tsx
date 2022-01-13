import { Form, Button, Spinner } from 'react-bootstrap';

interface IProps {
  fields: {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
  };
  handleFieldChange: (event: any) => void;
  handleConfirmClick: () => void;
  isLoading: boolean;
  errorMessage: string;
}

export const ResetPasswordForm = ({
  fields,
  handleFieldChange,
  handleConfirmClick,
  isLoading,
  errorMessage,
}: IProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleConfirmClick();
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
