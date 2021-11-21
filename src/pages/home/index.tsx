import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Dashboard } from './components';
import { HomeViewModel } from './home-view-model';

export const HomePage = observer(() => {
  const [viewModel] = useState(new HomeViewModel());
  const { path } = useRouteMatch();

  useEffect(() => {
    viewModel.fetchAllClasses();
  }, [viewModel]);

  return (
    <Switch>
      <Route exact path={path}>
        <>
          <Dashboard allClass={viewModel.allClass} />
        </>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
});
