import { useState, memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UserAuthen } from 'shared/types';
import { getErrors, getErrorsState } from './helper';
import { FormError } from './types';

interface IProps {
  onLogin: (user: UserAuthen) => void;
}

const initState = {
  username: '',
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
        usernameOrEmail: formValue['username'],
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
    if (fieldName) {
      state[fieldName] = value;
      setFormValue(state);
    }
  };

  const { userNameError, passwordError } = getErrors(errors);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          required
          onChange={(event: any) =>
            handleFieldChange('username', event.target.value)
          }
          isInvalid={!!userNameError}
          type="text"
          placeholder="Nhập tên đăng nhập/email"
        />
        <Form.Control.Feedback type="invalid">
          {userNameError?.errorMessage}
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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Lưu mật khẩu" />
      </Form.Group>
      <Button variant="secondary" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
});
