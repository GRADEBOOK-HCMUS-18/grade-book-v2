import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AiFillInfoCircle } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router-dom';
import { useResponsive } from 'shared/hooks';
import { classDetailViewModel } from 'shared/view-models';
import { ClassInfoModal, ClassLeftItem, ClassPost } from './components';
import './style/index.css';

export const ClassDashboard = observer(() => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { id }: any = useParams();
  const history = useHistory();

  const { isTablet } = useResponsive();
  const { classInfo } = classDetailViewModel;

  useEffect(() => {
    const waitForData = async () => {
      const result = await classDetailViewModel.getClassInfo(id);
      if (!result) {
        history.push('/class');
      }
    };
    waitForData();
  }, [id, history]);

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
});
