import Button from '@restart/ui/esm/Button';
import { observer } from 'mobx-react';
import { ClassDetail } from 'pages';
import { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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
          <Button onClick={handleClick}>Get random to do</Button>
        </div>
      </Route>

      <Route path={`${path}/:id`}>
        <ClassDetail />
      </Route>
    </Switch>
  );
});
