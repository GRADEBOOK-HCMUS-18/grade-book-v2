import { Link, useRouteMatch } from 'react-router-dom';
import { ClassDetailInfo } from 'shared/models';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassDashboard = ({ classInfo }: IProps) => {
  const { url } = useRouteMatch();
  return (
    <div className="class-info">
      <h3>{classInfo.name}</h3>
      <p>{classInfo.description}</p>
      <p>{classInfo.room}</p>
      <Link to={`${url}/people`}>
        <div className="see-member-btn">Xem thành viên</div>
      </Link>
    </div>
  );
};
