import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from 'router';
import { ClassView } from './components/class-view';

export const ClassDetail = () => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <div className="container">
          <ClassView />
        </div>
      </Route>
      <PrivateRoute path={`${url}/homework`}>
        <div className="container">Bai tap</div>
      </PrivateRoute>
      <PrivateRoute path={`${url}/people`}>
        <div className="container">Thanh vien</div>
      </PrivateRoute>
      <Route>
        <Redirect to={url} />
      </Route>
    </Switch>
  );
};
