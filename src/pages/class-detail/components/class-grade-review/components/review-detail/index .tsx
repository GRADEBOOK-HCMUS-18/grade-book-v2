import { memo, useEffect, useRef } from 'react';
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
  isOwner: boolean;
  onSendReply: (content: string) => void;
}

export const ReviewDetail = ({
  data,
  student,
  isOwner,
  onSendReply,
}: IProps) => {
  const onSendMessage = (content: string) => {
    onSendReply(content);
  };
  let bottomRef: any = useRef();

  useEffect(() => {
    bottomRef.scrollIntoView({ behavior: 'smooth' });
  });
  return (
    <div className="review-detail-container">
      <Header isOwner={isOwner} data={data} />

      <div className="review-message-total">
        <BsChatRightText size={20} />
        <span>{data.replies.length + 1} Nhận xét</span>
      </div>
      <div className="review-message-container">
        <div className="review-message">
          <Avatar size={35} user={student} />
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

        {data.replies.map((reply) => (
          <div key={reply.id} className="review-message">
            <Avatar size={35} user={reply.replier} />
            <div className="review-message-info">
              <div>
                <span style={{ fontWeight: 'bold' }}>
                  {reply.replier.lastName} {reply.replier.firstName}
                </span>
                <span style={{ paddingLeft: 10, fontSize: 12 }}>
                  {stringToDateDisplay(reply.dateTime)}
                </span>
              </div>

              <span>{reply.content}</span>
            </div>
          </div>
        ))}
        <div ref={(el) => (bottomRef = el)}></div>
      </div>
      <MessageInput sendMessage={onSendMessage} />
    </div>
  );
};

interface IPropsModal {
  data: GradeReview;
  onHide: () => void;
  show: boolean;
  student: User;
  isOwner: boolean;
  onSendReply: (content: string) => void;
}

export const ReviewDetailModal = ({
  data,
  onHide,
  show,
  student,
  isOwner,
  onSendReply,
}: IPropsModal) => {
  const onSendMessage = (content: string) => {
    onSendReply(content);
  };

  let bottomRef: any = useRef();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.scrollIntoView({ behavior: 'smooth' });
    }
  });

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
      <Modal.Body style={{ padding: 0 }}>
        <div className="review-detail-container">
          <Header isOwner={isOwner} data={data} />
          <div className="review-message-total">
            <BsChatRightText size={20} />
            <span>{data.replies.length + 1} Nhận xét</span>
          </div>
          <div className="review-message-container">
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

            {data.replies.map((reply) => (
              <div key={reply.id} className="review-message">
                <Avatar size={35} user={reply.replier} />
                <div className="review-message-info">
                  <div>
                    <span style={{ fontWeight: 'bold' }}>
                      {reply.replier.lastName} {reply.replier.firstName}
                    </span>
                    <span style={{ paddingLeft: 10, fontSize: 12 }}>
                      {stringToDateDisplay(reply.dateTime)}
                    </span>
                  </div>

                  <span>{reply.content}</span>
                </div>
              </div>
            ))}
            <div ref={(el) => (bottomRef = el)}></div>
          </div>

          <MessageInput sendMessage={onSendMessage} />
        </div>
      </Modal.Body>
    </Modal>
  );
};
