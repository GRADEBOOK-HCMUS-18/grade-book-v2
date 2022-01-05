import { memo } from 'react';
import { Modal } from 'react-bootstrap';
import { BsChatRightText } from 'react-icons/bs';
import { Avatar } from 'shared/components';
import { GradeReview, User } from 'shared/models';
import { stringToDateDisplay } from 'utils/date';
import { Header } from './components/header';
import { MessageInput } from './components/message-input';

interface IProps {
  data: GradeReview;
  student: User;
}

export const ReviewDetail = memo(({ data, student }: IProps) => {
  const onSendMessage = (content: string) => {
    console.log(content);
  };
  return (
    <div className="review-detail-container">
      <Header data={data} />

      <div className="review-message-container">
        <div className="review-message-total">
          <BsChatRightText size={20} />
          <span>{data.replies.length + 1} Nhận xét</span>
        </div>
        <div className="review-message">
          <Avatar size={40} user={student} />
          <div className="review-message-info">
            <div>
              <span style={{ fontWeight: 'bold' }}>
                {data.student.fullName}
              </span>
              <span style={{ paddingLeft: 10, fontSize: 12 }}>
                {stringToDateDisplay(data.dateCreated)}
              </span>
            </div>

            <span>{data.description}</span>
          </div>
        </div>
      </div>
      <MessageInput sendMessage={onSendMessage} />
    </div>
  );
});

interface IPropsModal {
  data: GradeReview;
  onHide: () => void;
  show: boolean;
  student: User;
}

export const ReviewDetailModal = memo(
  ({ data, onHide, show, student }: IPropsModal) => {
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
          <Modal.Title id="contained-modal-title-vcenter">
            Thảo luận
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '550px' }}>
          <div className="review-detail-container">
            <Header data={data} />

            <div className="review-message-container">
              <div className="review-message-total">
                <BsChatRightText size={20} />
                <span>{data.replies.length + 1} Nhận xét</span>
              </div>
              <div className="review-message">
                <Avatar size={40} user={student} />
                <div className="review-message-info">
                  <div>
                    <span style={{ fontWeight: 'bold' }}>
                      {data.student.fullName}
                    </span>
                    <span style={{ paddingLeft: 10, fontSize: 12 }}>
                      {stringToDateDisplay(data.dateCreated)}
                    </span>
                  </div>

                  <span>{data.description}</span>
                </div>
              </div>
            </div>
            <MessageInput sendMessage={onSendMessage} />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);
