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

type FieldType = 'email' | 'firstName' | 'lastName' | 'studentIdentification';

export const UserInfo = ({ user, onChange, openPasswordModal }: IProps) => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [userInfo, setUserInfo] = useState(user);

  const handleChangeField = (fieldName: FieldType, event: any) => {
    setUserInfo({ ...userInfo, [fieldName]: removeSpace(event.target.value) });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newErrors = getErrorsState(userInfo, false);
    let email = userInfo.email,
      studentId = userInfo.studentIdentification;
    if (!newErrors.length) {
      if (email === user.email) {
        email = '';
      }
      if (studentId === user.studentIdentification) {
        studentId = '';
      }
      onChange({ ...userInfo, email: email, studentIdentification: studentId });
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
          defaultValue={user.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {firstNameError?.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mã số sinh viên</Form.Label>
        <Form.Control
          disabled={user.studentIdentification !== null}
          required
          onChange={(event) =>
            handleChangeField('studentIdentification', event)
          }
          type="text"
          defaultValue={
            user.studentIdentification ? user.studentIdentification : ''
          }
        />
        <Form.Text className="text-muted">
          Bạn chỉ có thể cập nhật MSSV 1 lần duy nhất nếu muốn thay đổi hãy liên
          lạc với quản trị viên của trang web
        </Form.Text>
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
