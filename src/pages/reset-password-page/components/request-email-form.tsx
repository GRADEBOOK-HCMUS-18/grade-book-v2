import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { getEmailError } from './helper';

interface IProps {
  fields: any;
  handleFieldChange: any;
  handleSendEmailClick: any;
  isLoading?: boolean;
}

export const RequestEmailForm = ({
  fields,
  handleFieldChange,
  handleSendEmailClick,
  isLoading,
}: IProps) => {
  const [errorMessage, setErrorMessage] = useState<any>('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let message = getEmailError(fields.email);
    if (message === '') {
      message = handleSendEmailClick();
    }
    setErrorMessage(message);
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
