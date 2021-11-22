import { useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { homeViewModel } from 'pages/home/home-view-model';
import '../style/invitation-link-modal.css';

export const InvitationLinkModal = observer(() => {
  const [showToast, setShowToast] = useState(false);

  const showModal = homeViewModel.isShowInvitationModal;
  const invitationLink = homeViewModel.invitationLink;

  const hideDialog = () => {
    homeViewModel.setShowInvitationModal(false);

    setShowToast(false);
  };

  const copyTextToClipboard = () => {
    homeViewModel.copyTextToClipboard(invitationLink);
    setTimeout(() => setShowToast(true), 500);
  };

  return (
    <div>
      <ToastContainer
        style={{ zIndex: 1080 }}
        position="bottom-start"
        className="mb-5 ms-5"
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body>{homeViewModel.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        show={showModal}
        onHide={hideDialog}
        className="d-flex justify-content-center align-items-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Link mời vào lớp học</Modal.Title>
        </Modal.Header>
        <Form className="fill-form">
          <Modal.Body>
            <Form.Group controlId="teacherLink">
              <Form.Label className="text-muted">
                Link mời tham gia lớp học
              </Form.Label>
              <Form.Control
                type="text"
                name="invitationLink"
                defaultValue={invitationLink}
                aria-describedby="title-help"
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={copyTextToClipboard}>
            Lưu vào Clipboard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});
