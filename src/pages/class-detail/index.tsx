import { observer } from 'mobx-react';
import { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import { PrivateRoute } from 'router';
import { classDetailViewModel } from 'shared/view-models';
import { ClassView, ClassMember } from './components';

export const ClassDetail = observer(() => {
  const { path, url } = useRouteMatch();
  const { id }: any = useParams();

  useEffect(() => {
    classDetailViewModel.getClassInfo(id);
  }, [id]);

  return (
    <Switch>
      <Route exact path={path}>
        <div className="container">
          <ClassView classInfo={classDetailViewModel.classInfo} />
        </div>
      </Route>
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
