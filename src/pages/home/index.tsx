import { observer } from 'mobx-react';
import { ClassDetail } from 'pages';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard } from './components';
import { homeViewModel } from './home-view-model';

export const HomePage = observer(() => {
  const { path } = useRouteMatch();

  useEffect(() => {
    homeViewModel.fetchAllClasses();
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        <>
          <Dashboard allClass={homeViewModel.allClass} />
        </>
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
});
