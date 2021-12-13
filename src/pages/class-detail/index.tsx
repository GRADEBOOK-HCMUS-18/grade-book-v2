import { observer } from 'mobx-react-lite';
import { MemberInvitation } from 'pages';
import { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { PrivateRoute } from 'router';
import { useQuery } from 'shared/hooks';
import { classDetailViewModel } from 'shared/view-models';
import {
  ClassDashboard,
  ClassGradeManagement,
  ClassGradeTable,
  ClassMember,
} from './components';

export const ClassDetail = () => {
  const query = useQuery();
  const inviteId = query.get('invite');

  let viewRender;
  viewRender = inviteId ? (
    <div className="container">
      <MemberInvitation inviteID={inviteId} />
    </div>
  ) : (
    <ClassRoute />
  );
  return viewRender;
};

const ClassRoute = observer(() => {
  const { path, url } = useRouteMatch();
  const { id }: any = useParams();
  const history = useHistory();

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
          <ClassDashboard />
        </div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/homework`}>
        <div className="container">
          <ClassGradeTable classInfo={classInfo} />
        </div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/people`}>
        <div className="container">
          <ClassMember classInfo={classInfo} />
        </div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/grade`}>
        <div className="container">
          <ClassGradeManagement assignments={classInfo.assignments} />
        </div>
      </PrivateRoute>
      <Route>
        <Redirect to={url} />
      </Route>
    </Switch>
  );
});
