import { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { classActionViewModel, joinClassViewModel } from 'shared/view-models';
import './style/index.css';
import { translateErrorMessage } from './helper';

const JoinClassModal = observer(() => {
  const [InviteID, setInviteID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inviteID: string = event.target.value;
    setInviteID(inviteID);
  };

  const showModal = classActionViewModel.showJoinClassModal;
  const hideDialog = () => {
    classActionViewModel.setShowJoinClassModal(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res: { isError: boolean; message: string } =
      await joinClassViewModel.getClassInfoByInviteId(InviteID);

    if (res.isError) setErrorMessage(res.message);
    else JoinClass(InviteID);
  };

  const JoinClass = async (inviteId: string) => {
    const classId = joinClassViewModel.invitedClassInfo.classInformation.id;
    if (!joinClassViewModel.isAlreadyInClass) {
      const res = await joinClassViewModel.joinClass(inviteId);
      if (res.isError) setErrorMessage(res.message);
      else history.push(`/class/${classId}`);
    } else history.push(`/class/${classId}`);
  };

  return (
    <Modal
      show={showModal}
      onHide={hideDialog}
      className="d-flex justify-content-center align-items-center"
    >
      <Modal.Header closeButton>
        <Modal.Title>Tham gia lớp học</Modal.Title>
      </Modal.Header>
      <Form className="fill-form" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập mã lớp học"
              name="inviteClassID"
              value={InviteID}
              onChange={handleChange}
              aria-describedby="title-help"
              className="mt-1"
              isInvalid={errorMessage !== ''}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {translateErrorMessage(errorMessage)}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Tham gia
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
});

export { JoinClassModal };
