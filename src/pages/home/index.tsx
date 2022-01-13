import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { User } from 'shared/models';
import { userViewModel } from 'shared/view-models';
import { Dashboard, UnconfirmedEmailPage } from './components';
import { homeViewModel } from './home-view-model';

export const HomePage = observer(() => {
  const { path } = useRouteMatch();
  const user: User = userViewModel.user;
  useEffect(() => {
    homeViewModel.fetchAllClasses();
  }, []);

  return user.isEmailConfirmed === false ? (
    <UnconfirmedEmailPage />
  ) : (
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
