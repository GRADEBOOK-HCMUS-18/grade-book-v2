import { useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Button } from 'react-bootstrap';
import { classActionViewModel } from 'shared/view-models';
import './style/index.css';

const JoinClassModal = observer(() => {
  const [InviteID, setInviteID] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inviteID: string = event.target.value;
    setInviteID(inviteID);
  };

  const showModal = classActionViewModel.showJoinClassModal;
  const hideDialog = () => {
    classActionViewModel.setShowJoinClassModal(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              placeholder="Mã lớp học"
              name="inviteClassID"
              value={InviteID}
              onChange={handleChange}
              aria-describedby="title-help"
              className="mt-1"
              required
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideDialog}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Tham gia
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export { JoinClassModal };
