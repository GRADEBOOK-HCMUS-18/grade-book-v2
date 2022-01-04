import { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { GradeReview } from 'shared/models';
import { Header } from './components/header';
import { MessageInput } from './components/message-input';

interface IProps {
  data: GradeReview;
}

export const ReviewDetail = memo(({ data }: IProps) => {
  const onSendMessage = (content: string) => {
    console.log(content);
  };
  return (
    <div className="review-detail-container">
      <div style={{ height: '85%' }}>
        <Header data={data} />
      </div>
      <MessageInput sendMessage={onSendMessage} />
    </div>
  );
});

interface IPropsModal {
  data: GradeReview;
  onHide: () => void;
  show: boolean;
}

export const ReviewDetailModal = memo(({ data, onHide, show }: IPropsModal) => {
  const onSendMessage = (content: string) => {
    console.log(content);
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Thảo luận</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '550px' }}>
        <div className="review-detail-container">
          <Header data={data} />
          <div style={{ height: '420px' }}></div>

          <MessageInput sendMessage={onSendMessage} />
        </div>
      </Modal.Body>
    </Modal>
  );
});
