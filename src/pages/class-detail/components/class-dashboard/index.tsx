import { observer } from 'mobx-react';
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
import { classDetailViewModel, lineLoadingViewModel } from 'shared/view-models';
import { ClassMember } from './components';
import './style/index.css';

export const ClassDashboard = observer(() => {
  const { path, url } = useRouteMatch();
  const { id }: any = useParams();
  const history = useHistory();
  const { classInfo } = classDetailViewModel;

  useEffect(() => {
    const waitForData = async () => {
      const result = await classDetailViewModel.getClassInfo(id);
      lineLoadingViewModel.stopLoading();
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
          {lineLoadingViewModel.isLoading ? (
            <></>
          ) : (
            <div className="class-info">
              <h3>{classInfo.name}</h3>
              <p>{classInfo.description}</p>
              <p>{classInfo.room}</p>
            </div>
          )}
        </div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/homework`}>
        <div className="container">Bai tap</div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/people`}>
        <div className="container">
          <ClassMember
            backUrl={url}
            classInfo={classDetailViewModel.classInfo}
          />
        </div>
      </PrivateRoute>
      <Route>
        <Redirect to={url} />
      </Route>
    </Switch>
  );
});
