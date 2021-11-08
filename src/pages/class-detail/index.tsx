import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

export const ClassDetail = () => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <p>Bảng tin</p>
      </Route>
      <Route path={`${url}/homework`}>
        <p>bai tap</p>
      </Route>
      <Route path={`${url}/people`}>
        <p>Moi nguoi</p>
      </Route>
      <Route>
        <Redirect to="/class" />
      </Route>
    </Switch>
  );
};
