import { isEqual } from 'lodash';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { User } from 'shared/models';
import { removeSpace } from 'utils/string';
import { FormError, getErrors, getErrorsState } from './helper';

interface IProps {
  user: User;
  onChange: (user: User) => void;
  openPasswordModal: () => void;
}

type FieldType = 'email' | 'firstName' | 'lastName' | 'studentID';

export const UserInfo = ({ user, onChange, openPasswordModal }: IProps) => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [userInfo, setUserInfo] = useState(user);

  const handleChangeField = (fieldName: FieldType, event: any) => {
    setUserInfo({ ...userInfo, [fieldName]: removeSpace(event.target.value) });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newErrors = getErrorsState(userInfo);
    if (!newErrors.length && !isEqual(userInfo, user)) {
      onChange(userInfo);
    }
    setErrors(newErrors);
  };

  const { emailError, lastNameError, firstNameError } = getErrors(errors);

  return (
    <Form noValidate onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          onChange={(event) => handleChangeField('email', event)}
          type="text"
          defaultValue={user.email}
          isInvalid={!!emailError}
        />
        <Form.Control.Feedback type="invalid">
          {emailError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Họ</Form.Label>
        <Form.Control
          required
          onChange={(event) => handleChangeField('lastName', event)}
          isInvalid={!!lastNameError}
          defaultValue={user.lastName}
          type="text"
        />
        <Form.Control.Feedback type="invalid">
          {lastNameError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>Tên</Form.Label>
        <Form.Control
          required
          onChange={(event) => handleChangeField('firstName', event)}
          isInvalid={!!firstNameError}
          type="text"
          defaultValue={user.fistName}
        />
        <Form.Control.Feedback type="invalid">
          {firstNameError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mã số sinh viên</Form.Label>
        <Form.Control
          required
          onChange={(event) =>
            handleChangeField('studentID', event.target.value)
          }
          type="text"
          placeholder={user.studentID}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Button variant="success" type="submit">
          Cập nhật
        </Button>
        <Button
          onClick={openPasswordModal}
          style={{ marginLeft: 10 }}
          variant="primary"
        >
          Đổi mật khẩu
        </Button>
      </Form.Group>
    </Form>
  );
};
