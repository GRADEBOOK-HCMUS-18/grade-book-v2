import { observer } from 'mobx-react';
import TextTruncate from 'react-text-truncate'; // recommend
import { Avatar } from 'shared/components';
import { UserNotification } from 'shared/models';
import { userViewModel } from 'shared/view-models';
import { calcReceivedTime, stringToDateDisplay } from 'utils/date';
import { generateNotificationMessage } from './helper';
import './style/index.css';

interface IProps {
  content: UserNotification;
  goToDetailPage: any;
}

const LoggedInUser = userViewModel.user;

export const NotificationCard = observer(
  ({ content, goToDetailPage }: IProps) => {
    const {
      id,
      user,
      assignment,
      dateTime,
      isViewed,
      review,
      notificationType,
    } = content;
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
            <div className="user-notification-image">
              <Avatar size={50} user={LoggedInUser} />
            </div>
            <div className="user-notification-card-message">
              <div className="user-notification-card-text">
                <strong>{classInfo.name}</strong>
                <br />
                <TextTruncate
                  line={2}
                  element="span"
                  truncateText="..."
                  text={message}
                  textTruncateChild={
                    <span style={{ color: 'blueviolet' }}>Đọc thêm</span>
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
