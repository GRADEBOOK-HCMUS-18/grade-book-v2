import { observer, Observer } from 'mobx-react';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { User } from 'shared/models';
import { userViewModel } from 'shared/view-models';
import { Dashboard, UnconfirmedEmailPage } from './components';
import { homeViewModel } from './home-view-model';

export const HomePage = observer(() => {
  const { path } = useRouteMatch();
  useEffect(() => {
    homeViewModel.fetchAllClasses();
  }, []);
  const user: User = userViewModel.user;
  return (
    <Switch>
      <Route exact path={path}>
        {!user.isEmailConfirmed && <UnconfirmedEmailPage />}
        {user.isEmailConfirmed && (
          <Dashboard allClass={homeViewModel.allClass} />
        )}
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
});
