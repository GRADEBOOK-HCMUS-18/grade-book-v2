import { useState, memo } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { UserAuthen } from 'shared/types';
import { getRandomAvatarColor } from 'utils/random';
import { getErrors, getErrorsState } from './helper';
import { FormError } from './types';

interface IProps {
  onRegister: (user: UserAuthen) => void;
}

const initState = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  reInputPassword: '',
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
        username: formValue['username'],
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
    userNameError,
    passwordError,
    reInputPasswordError,
    firstNameError,
    lastNameError,
  } = getErrors(errors);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="formBasicEmail">
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
        <Form.Group as={Col} md="7" controlId="formBasicUserName">
          <Form.Control
            onChange={(event: any) =>
              handleFieldChange('username', event.target.value)
            }
            isInvalid={!!userNameError}
            required
            type="text"
            placeholder="Nhập tên người dùng"
          />
          <Form.Control.Feedback type="invalid">
            {userNameError?.errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="formBasicFirstName">
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
        <Form.Group as={Col} md="7" controlId="formBasicLastName">
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
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="formBasicPassword">
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
        <Form.Group as={Col} md="7" controlId="formBasicRepeatPassword">
          <Form.Control
            onChange={(event: any) =>
              handleFieldChange('reInputPassword', event.target.value)
            }
            required
            type="password"
            isInvalid={!!reInputPasswordError}
            placeholder="Nhập lại mật khẩu"
          />
          <Form.Control.Feedback type="invalid">
            {reInputPasswordError?.errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Label></Form.Label>
          <Form.Check type="checkbox" label="Lưu mật khẩu" />
        </Form.Group>
      </Row>
      <Button variant="secondary" type="submit">
        Đăng kí
      </Button>
    </Form>
  );
});
