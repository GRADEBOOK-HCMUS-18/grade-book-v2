import { useState, memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserAuthen } from 'shared/types';
import { getErrors, getErrorsState } from './helper';
import { FormError } from './types';

interface IProps {
  onLogin: (user: UserAuthen) => void;
}

const initState = {
  email: '',
  password: '',
};

export const LoginForm = memo(({ onLogin }: IProps) => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [formValue, setFormValue] = useState<any>(initState);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newErrors = getErrorsState(formValue);

    if (!newErrors.length) {
      onLogin({
        email: formValue['email'],
        password: formValue['password'],
      });
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

  const { emailError, passwordError } = getErrors(errors);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          required
          onChange={(event: any) =>
            handleFieldChange('email', event.target.value)
          }
          isInvalid={!!emailError}
          type="text"
          placeholder="Nhập tên đăng nhập/email"
        />
        <Form.Control.Feedback type="invalid">
          {emailError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
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
      <Link to="/reset">
        <p className="register-btn"> Quên mật khẩu?</p>
      </Link>

      <Button variant="secondary" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
});
