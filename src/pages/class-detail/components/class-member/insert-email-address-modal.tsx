import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { ReactMultiEmail } from 'react-multi-email';
import { classMemberViewModel } from './class-member-view-model';
import './style/react-multi-email.css';
import { PopupAlert } from 'shared/components';

export const InsertEmailAddressModal = observer(() => {
  const [emails, setEmails] = useState<any>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const showModal = classMemberViewModel.showInsertEmailModal;

  const hideModal = () => {
    classMemberViewModel.setShowInsertEmailModal(false);
    setEmails([]);
  };

  const sendEmailsList = async () => {
    const result = await classMemberViewModel.sendEmailList(emails);
    if (result) {
      classMemberViewModel.message = 'Đã gửi thành công';
      setIsSuccess(true);
      setEmails([]);
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <>
      <PopupAlert
        show={classMemberViewModel.isError || isSuccess}
        error={!isSuccess}
        message={classMemberViewModel.message}
        onHide={() => {
          setIsSuccess(false);

          classMemberViewModel.deleteError();
        }}
      ></PopupAlert>
      <Modal
        show={showModal}
        onHide={hideModal}
        className="d-flex justify-content-center align-items-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Danh sách email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMultiEmail
            placeholder="Input your email"
            emails={emails}
            onChange={(_emails: string[]) => {
              setEmails([..._emails]);
            }}
            getLabel={(
              email: string,
              index: number,
              removeEmail: (index: number) => void
            ) => {
              return (
                <div data-tag key={index}>
                  <div data-tag-item>{email}</div>
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              );
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className=" px-3 me-3" onClick={hideModal}>
            Hủy
          </Button>
          <Button className="px-3" onClick={sendEmailsList}>
            Mời
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});
