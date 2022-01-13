import { observer } from 'mobx-react';
import TextTruncate from 'react-text-truncate'; // reccommend
import { AiTwotoneNotification, AiFillMessage } from 'react-icons/ai';
import { UserNotification } from 'shared/models';
import { calcReceivedTime } from 'utils/date';
import { generateNotificationMessage } from './helper';
import './style/index.css';

interface IProps {
  content: UserNotification;
  goToDetailPage: any;
}

export const NotificationCard = observer(
  ({ content, goToDetailPage }: IProps) => {
    const { id, user, assignment, dateTime, isViewed, notificationType } =
      content;
    const classInfo = content.class;
    const createdTime: Date = new Date(dateTime);
    const receivedTime = calcReceivedTime(createdTime);
    const message = generateNotificationMessage(
      notificationType,
      classInfo,
      assignment,
      user
    );

    const handleClick = () => {
      goToDetailPage(notificationType, classInfo?.id, id);
    };

    return (
      <div onClick={handleClick} className="user-notification-card">
        <div className="user-notification-card-link">
          <div className="user-notification-card-content">
            <div className="user-notification-card-message">
              <div className="user-notification-card-text">
                <div className="d-flex flex-row">
                  {notificationType === 'NewFinalizedGradeComposition' ? (
                    <AiTwotoneNotification
                      style={{ color: 'green' }}
                      className="me-2"
                      size={20}
                    />
                  ) : (
                    <AiFillMessage
                      style={{ color: 'blue' }}
                      className="me-2"
                      size={20}
                    />
                  )}
                  <strong style={{ fontSize: '1.2rem' }}>
                    {classInfo.name}
                  </strong>
                </div>
                <TextTruncate
                  line={2}
                  element="span"
                  truncateText="..."
                  text={message}
                  textTruncateChild={
                    <span style={{ color: 'blueviolet' }}>Read</span>
                  }
                />
              </div>

              {dateTime && (
                <div className="user-notification-card-time">
                  {receivedTime}
                </div>
              )}
            </div>
          </div>
        </div>
        {isViewed === false ? (
          <div className="user-notification-card-unread"></div>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
