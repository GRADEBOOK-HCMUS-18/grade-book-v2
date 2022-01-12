import { useState, useRef, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiMessageAltX } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { PopUp } from 'shared/components';
import { User, UserNotification } from 'shared/models';
import { useResponsive } from 'shared/hooks';
import { UserNotificationType } from 'shared/types';
import { userNotificationsViewModel, userViewModel } from 'shared/view-models';
import { NotificationCard, NotificationSpinner } from './components';
import { createURL } from './helper';
import './style/index.css';

export const PopOverUserNotifications = observer(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [numberOfNotViewNotification, setNumberOfNotViewNotification] =
    useState<number>(98);
  const history = useHistory();
  const bottomRef = useRef<any>();
  const { isMobile } = useResponsive();

  const [data, setData] = useState<Array<UserNotification>>([]);

  useEffect(() => {
    const waitForData = async () => {
      await userNotificationsViewModel.getNotifications();
    };
    waitForData();
  }, []);

  useEffect(() => {
    //recompute recevied time
    //update notifications
    setData(userNotificationsViewModel.notifications);
    setNumberOfNotViewNotification(
      userNotificationsViewModel.numberOfNotViewedNotification
    );
  }, [
    userNotificationsViewModel.notifications,
    userNotificationsViewModel.numberOfNotViewedNotification,
    showPopUp,
  ]);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [bottomRef]);

  const markAsReadAll = useCallback(async () => {
    const result = await userNotificationsViewModel.markAsReadAll();
    if (result === false) setShowPopUp(false);
  }, []);

  const getMoreNotifications = useCallback(async () => {
    setLoading(true);
    scrollToBottom();
    await userNotificationsViewModel.fetchMoreNotifications();
    setLoading(false);
  }, [scrollToBottom]);

  const goToDetailPage = useCallback(
    (type: UserNotificationType, classId: number, notificationId: number) => {
      const url = createURL(type, classId);
      history.push(url);
      setShowPopUp(false);
      userNotificationsViewModel.markAsRead(notificationId);
    },
    [history]
  );

  return (
    <>
      <PopUp
        show={showPopUp}
        onHide={() => setShowPopUp(false)}
        placement="bottom-left"
        overlay={
          <div
            className="user-notification-container"
            style={isMobile ? { width: '90vw' } : {}}
          >
            <div className="user-notification-header">
              <div className="user-notification-header-title">Thông báo</div>
              {data?.length && (
                <div
                  className="user-notification-header-option"
                  onClick={() => markAsReadAll()}
                >
                  Đánh dấu đã đọc tất cả
                </div>
              )}
            </div>

            <div className="user-notification-items">
              {data?.length ? (
                <>
                  {data?.map((item) => (
                    <NotificationCard
                      key={item.id}
                      content={item}
                      goToDetailPage={goToDetailPage}
                    ></NotificationCard>
                  ))}
                  <div
                    className="user-notification-card-loader"
                    ref={bottomRef}
                    style={
                      loading
                        ? { visibility: 'visible' }
                        : { visibility: 'hidden' }
                    }
                  >
                    <NotificationSpinner />
                  </div>
                </>
              ) : (
                <div className="user-empty-notification">
                  <BiMessageAltX size={80} className="my-3" color="lightGray" />
                  <h5>Không có thông báo mới</h5>
                </div>
              )}
            </div>

            <div className="user-notification-footer">
              <div onClick={getMoreNotifications}>
                <span className="user-notification-see-all">Xem thêm</span>
              </div>
            </div>
          </div>
        }
      >
        <div
          btn-floating
          className="user-notification-icon"
          onClick={() => setShowPopUp(!showPopUp)}
        >
          <IoMdNotificationsOutline
            className="user-notification-image"
            size={30}
          />
          {numberOfNotViewNotification > 0 && (
            <div
              className="user-notification-count"
              style={
                numberOfNotViewNotification >= 100 ? { fontSize: '0.5rem' } : {}
              }
            >
              {numberOfNotViewNotification < 100
                ? numberOfNotViewNotification
                : '99+'}
            </div>
          )}
        </div>
      </PopUp>
    </>
  );
});

// const createNotificationList = (): Array<UserNotification> => {
//   const notification = new UserNotification();
//   notification.notificationId = '3';
//   notification.createdAt = new Date();
//   notification.classId = 1;
//   notification.isRead = false;
//   notification.type = 1;
//   notification.user = userViewModel.user;
//   notification.assignmentName = 'final-term';
//   notification.className =
//     'Java Programming For Advanced Student From ABC Univeristy of Science Ho Chi Minh City';

//   const list = [
//     notification,
//     notification,
//     notification,
//     notification,
//     notification,
//     notification,
//     notification,
//   ];
//   return list;
// };
