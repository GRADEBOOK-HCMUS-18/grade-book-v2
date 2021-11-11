import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getErrors, getErrorsState } from './helper';
import { FormError } from './types';

const initState = {
  email: '',
  username: '',
  password: '',
};

export const LoginForm = () => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [formValue, setFormValue] = useState<any>(initState);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newErrors = getErrorsState(formValue);
    setErrors(newErrors);
  };

  const handleFieldChange = (
    fieldName: FormError['errorType'],
    value: string
  ) => {
    const state = { ...formValue };
    if (fieldName) {
      state[fieldName] = value;
      setFormValue(state);
    }
  };

  const { userNameError, passwordError } = getErrors(errors);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Tên người dùng/Email</Form.Label>
        <Form.Control
          required
          onChange={(event: any) =>
            handleFieldChange('username', event.target.value)
          }
          isInvalid={!!userNameError}
          type="text"
          placeholder="Nhập tên người dùng/email"
        />
        <Form.Control.Feedback type="invalid">
          {userNameError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          onChange={(event: any) =>
            handleFieldChange('password', event.target.value)
          }
          isInvalid={!!passwordError}
          required
          type="password"
          placeholder="Nhập mật khẩu"
        />
        <Form.Control.Feedback type="invalid">
          {passwordError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Lưu mật khẩu" />
      </Form.Group>

      <Button variant="secondary" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
};
