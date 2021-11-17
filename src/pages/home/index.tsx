import Button from '@restart/ui/esm/Button';
import { observer } from 'mobx-react';
import { ClassDetail } from 'pages';
import { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from 'shared/components';
import { HomeViewModel } from './home-view-models';
import { DashboardPage } from './components';
export const HomePage = observer(() => {
  const [viewModal] = useState(new HomeViewModel());
  const { path } = useRouteMatch();

  const handleClick = () => {
    viewModal.getTodoById();
  };

  return (
    <Switch>
      <Route exact path={path}>
        <>
          <DashboardPage userId = "1234"/>
        </>
      </Route>

      <Route path={`${path}/:id`}>
        <ClassDetail />
      </Route>
    </Switch>
  );
});
