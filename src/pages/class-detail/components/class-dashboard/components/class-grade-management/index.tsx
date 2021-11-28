import { observer } from 'mobx-react';
import { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { PrivateRoute } from 'router';
import { EditGradeStructure } from './components/edit-grade-structure';
import './style/index.css';

export const ClassGradeManagement = observer(() => {
  const { path, url } = useRouteMatch();
  const { id }: any = useParams();
  const history = useHistory();

  useEffect(() => {});

  return (
    <Switch>
      <PrivateRoute path={`${url}/edit`}>
        <div className="container">
          <EditGradeStructure />
        </div>
      </PrivateRoute>
      <Route>
        <Redirect to={url} />
      </Route>
    </Switch>
  );
});
