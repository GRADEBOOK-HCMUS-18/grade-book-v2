import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AiFillInfoCircle } from 'react-icons/ai';
import { useResponsive } from 'shared/hooks';
import { ClassDetailInfo } from 'shared/models';
import { ClassInfoModal, ClassLeftItem, ClassPost } from './components';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassDashboard = ({ classInfo }: IProps) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { isTablet } = useResponsive();

  return (
    <>
      <div className="class-info">
        <h3>{classInfo.name}</h3>
        <p>{classInfo.description}</p>
        <p>{classInfo.room}</p>
        {isTablet && (
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-bottom">Hiện thông tin về lớp</Tooltip>
            }
          >
            <div className="class-info-btn">
              <AiFillInfoCircle
                onClick={() => setShowInfoModal(true)}
                size={30}
              />
            </div>
          </OverlayTrigger>
        )}
      </div>
      <div className="class-post">
        {isTablet ? (
          <ClassInfoModal
            classInfo={classInfo}
            show={showInfoModal}
            onHide={() => setShowInfoModal(false)}
          />
        ) : (
          <ClassLeftItem classInfo={classInfo} />
        )}

        <ClassPost />
      </div>
    </>
  );
};
