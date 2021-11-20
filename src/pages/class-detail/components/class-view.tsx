import { useQuery } from 'shared/hooks';
import { MemberInvitation } from 'pages';

export const ClassView = () => {
  const query = useQuery();
  const inviteId = query.get('invite');
  let viewRender;
  console.log(inviteId);
  viewRender = inviteId ? (
    <MemberInvitation inviteID={inviteId} />
  ) : (
    <p>Bang tin</p>
  );
  return viewRender;
};
