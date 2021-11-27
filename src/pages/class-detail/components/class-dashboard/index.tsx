import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { PrivateRoute } from 'router';
import { useResponsive } from 'shared/hooks';
import { classDetailViewModel } from 'shared/view-models';
import {
  ClassGradeManagement,
  ClassHomeWork,
  ClassInfoModal,
  ClassLeftItem,
  ClassMember,
  ClassPost,
} from './components';
import './style/index.css';

export const ClassDashboard = observer(() => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { path, url } = useRouteMatch();
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
    <Switch>
      <PrivateRoute exact path={path}>
        <div className="container">
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
        </div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/homework`}>
        <div className="container">
          <ClassHomeWork />
        </div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/people`}>
        <div className="container">
          <ClassMember classInfo={classDetailViewModel.classInfo} />
        </div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/grade`}>
        <div className="container">
          <ClassGradeManagement />
        </div>
      </PrivateRoute>
      <Route>
        <Redirect to={url} />
      </Route>
    </Switch>
  );
});
