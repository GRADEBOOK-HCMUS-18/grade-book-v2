import { observer } from 'mobx-react';
import TextTruncate from 'react-text-truncate'; // recommend
import { Avatar } from 'shared/components';
import { UserNotification } from 'shared/models';
import { calcReceivedTime } from 'utils/date';
import './style/index.css';

interface IProps {
  content: UserNotification;
  goToDetailPage: any;
}

export const NotificationCard = observer(
  ({ content, goToDetailPage }: IProps) => {
    const {
      notificationId,
      user,
      classId,
      className,
      assignmentName,
      createdAt,
      isRead,
      type,
    } = content;

    const receivedTime = calcReceivedTime(createdAt);
    const message = `${className}: ${assignmentName}`;
    const handleClick = () => {
      goToDetailPage(type, classId, notificationId);
    };

    return (
      <div onClick={handleClick} className="user-notification-card">
        <div className="user-notification-card-link">
          <div className="user-notification-card-content">
            <div className="user-notification-image">
              <Avatar size={50} user={user} />
            </div>
            <div className="user-notification-card-message">
              <div className="user-notification-card-text">
                <TextTruncate
                  line={2}
                  element="span"
                  truncateText="..."
                  text={message}
                  textTruncateChild={
                    <span style={{ color: 'blueviolet' }}>Read more</span>
                  }
                />
              </div>

              {createdAt && (
                <div className="user-notification-card-time">
                  {receivedTime}
                </div>
              )}
            </div>
          </div>
        </div>
        {isRead === false ? (
          <div className="user-notification-card-unread"></div>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
