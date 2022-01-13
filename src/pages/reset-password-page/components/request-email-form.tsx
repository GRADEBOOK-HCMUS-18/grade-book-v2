import { Form, Button, Spinner } from 'react-bootstrap';

interface IProps {
  fields: any;
  handleFieldChange: () => void;
  handleSendEmailClick: () => void;
  isLoading: boolean;
  errorMessage: string;
}

export const RequestEmailForm = ({
  fields,
  handleFieldChange,
  handleSendEmailClick,
  isLoading,
  errorMessage,
}: IProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSendEmailClick();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Nhập email của bạn</h2>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              autoFocus
              value={fields.email}
              isInvalid={errorMessage !== ''}
              onChange={handleFieldChange}
              placeholder="Nhập email của bạn"
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
              <h3 className="ms-2 my-1 ">Gửi email</h3>
            </div>
          </Button>
        </Form>
      </div>
    </div>
  );
};
