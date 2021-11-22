import { useQuery } from 'shared/hooks';
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
    <p>Moi vo lop</p>
  ) : (
    <ClassDashboard classInfo={classInfo} />
  );
  return viewRender;
};
