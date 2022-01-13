import { Form, Button, Spinner } from 'react-bootstrap';
import { convertMilisecondsToString } from '../helper';
interface IProps {
  fields: {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
  };
  handleFieldChange: (event: any) => void;
  handleSendCodeClick: () => void;
  countdown: number;
  isLoading: boolean;
  errorMessage: string;
}
export const RequestVerificationCodeForm = ({
  fields,
  handleFieldChange,
  handleSendCodeClick,
  countdown,
  isLoading,
  errorMessage,
}: IProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSendCodeClick();
  };
  const countdownInString: string = convertMilisecondsToString(countdown);

  return (
    <div className="card">
      <div className="card-header text-center">
        <h2 className="text-center">Nhập mã xác thực</h2>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="code">
            <Form.Label>Mã xác thực</Form.Label>
            <Form.Control
              name="code"
              autoFocus
              value={fields.code}
              isInvalid={errorMessage !== ''}
              onChange={handleFieldChange}
              placeholder="Nhập mã xác thực"
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Text>
            Vui lòng iểm tra email của bạn để lấy mã xác thực
          </Form.Text>
          <Form.Text>
            {`Mã xác thực sẽ hết hạn sau ${countdownInString}`}
          </Form.Text>
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
              <h3 className="ms-2 my-1 ">Gửi mã xác thực</h3>
            </div>
          </Button>
        </Form>
      </div>
    </div>
  );
};
