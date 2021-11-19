import { useQuery } from 'shared/hooks';

export const ClassView = () => {
  const query = useQuery();
  const inviteId = query.get('invite');
  let viewRender;
  viewRender = inviteId ? <p>Moi vao lop ne</p> : <p>Bang tin</p>;
  return viewRender;
};
