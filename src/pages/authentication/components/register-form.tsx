import { useState, memo } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { UserAuthen } from 'shared/types';
import { getRandomAvatarColor } from 'utils/random';
import { getErrors, getErrorsState } from './helper';
import { FormError } from './types';

interface IProps {
  onRegister: (user: UserAuthen) => void;
}

const initState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const RegisterForm = memo(({ onRegister }: IProps) => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [formValue, setFormValue] = useState<any>(initState);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newErrors = getErrorsState(formValue);
    if (!newErrors.length) {
      const defaultAvatar = getRandomAvatarColor();
      onRegister({
        password: formValue['password'],
        firstName: formValue['firstName'],
        lastName: formValue['lastName'],
        email: formValue['email'],
        profilePictureUrl: '',
        defaultProfilePictureHex: defaultAvatar,
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

  const {
    emailError,
    passwordError,

    firstNameError,
    lastNameError,
  } = getErrors(errors);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
        <Form.Control
          isInvalid={!!emailError}
          required
          onChange={(event: any) =>
            handleFieldChange('email', event.target.value)
          }
          type="email"
          placeholder="Nhập email"
        />
        <Form.Control.Feedback type="invalid">
          {emailError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formBasicFirstName">
        <Form.Control
          isInvalid={!!firstNameError}
          required
          onChange={(event: any) =>
            handleFieldChange('firstName', event.target.value)
          }
          type="text"
          placeholder="Nhập tên"
        />
        <Form.Control.Feedback type="invalid">
          {firstNameError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="formBasicLastName">
        <Form.Control
          onChange={(event: any) =>
            handleFieldChange('lastName', event.target.value)
          }
          isInvalid={!!lastNameError}
          required
          type="text"
          placeholder="Nhập họ"
        />
        <Form.Control.Feedback type="invalid">
          {lastNameError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
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

      <Button variant="secondary" type="submit">
        Đăng kí
      </Button>
    </Form>
  );
});
