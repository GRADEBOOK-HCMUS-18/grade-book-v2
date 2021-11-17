import { observer } from 'mobx-react';
import { useState } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Loading } from 'shared/components';
import { HomeViewModel } from './home-view-models';

export const HomePage = observer(() => {
  const [viewModal] = useState(new HomeViewModel());
  const { path } = useRouteMatch();

  const handleClick = () => {
    viewModal.getTodoById();
  };

  return (
    <Switch>
      <Route exact path={path}>
        <div className="container">
          <p>Danh sach lop hoc</p>
          <p>{viewModal.todo.name}</p>
          <Loading isLoading={viewModal.loading} />
          <button onClick={handleClick}>Get random to do</button>
        </div>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
});
