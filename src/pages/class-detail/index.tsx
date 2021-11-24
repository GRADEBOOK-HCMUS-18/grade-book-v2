import { MemberInvitation } from 'pages';
import { useQuery } from 'shared/hooks';
import { ClassDashboard } from './components';

export const ClassDetail = () => {
  const query = useQuery();
  const inviteId = query.get('invite');

  let viewRender;
  viewRender = inviteId ? (
    <div className="container">
      <MemberInvitation inviteID={inviteId} />
    </div>
  ) : (
    <ClassDashboard />
  );
  return viewRender;
};
