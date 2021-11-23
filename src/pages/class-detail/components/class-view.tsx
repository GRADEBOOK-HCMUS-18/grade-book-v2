import { useQuery } from 'shared/hooks';
import { MemberInvitation } from 'pages';
import { ClassDetailInfo } from 'shared/models';
import { ClassDashboard } from './class-dashboard';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassView = ({ classInfo }: IProps) => {
  const query = useQuery();
  const inviteId = query.get('invite');

  let viewRender;
  viewRender = inviteId ? (
    <MemberInvitation inviteID={inviteId} />
  ) : (
    <ClassDashboard classInfo={classInfo} />
  );
  return viewRender;
};
