import { PrivateRoute } from 'router';
import { useQuery } from 'shared/hooks';
import { userViewModel } from 'shared/view-models';

export const ClassView = () => {
  const query = useQuery();
  const inviteId = query.get('invite');
  const isLogin = userViewModel.isLogin();
  let viewRender;
  if (isLogin) {
    viewRender = inviteId ? <p>Moi vao lop ne</p> : <p>Bang tin</p>;
  } else {
    viewRender = <PrivateRoute />;
  }
  return viewRender;
};
