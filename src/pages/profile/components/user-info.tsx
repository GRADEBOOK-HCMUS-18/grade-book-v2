import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { User } from 'shared/models';
import { removeSpace } from 'utils/string';

interface IProps {
  user: User;
}

type FieldType = 'email' | 'firstName' | 'lastName' | 'studentID';

export const UserInfo = ({ user }: IProps) => {
  const [userInfo, setUserInfo] = useState(user);

  const handleChangeField = (fieldName: FieldType, value: string) => {
    setUserInfo({ ...userInfo, [fieldName]: removeSpace(value) });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(userInfo);
  };
  return (
    <Form noValidate onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          onChange={(event) => handleChangeField('email', event.target.value)}
          type="text"
          placeholder={user.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Họ</Form.Label>
        <Form.Control
          required
          onChange={(event) =>
            handleChangeField('lastName', event.target.value)
          }
          type="text"
          placeholder={user.lastName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tên</Form.Label>
        <Form.Control
          required
          onChange={(event) =>
            handleChangeField('firstName', event.target.value)
          }
          type="text"
          placeholder={user.fistName}
        />
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
        <Button variant="primary">Đổi mật khẩu</Button>
      </Form.Group>
    </Form>
  );
};
