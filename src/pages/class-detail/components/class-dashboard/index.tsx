import { ClassDetailInfo } from 'shared/models';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassDashboard = ({ classInfo }: IProps) => {
  return (
    <div className="class-info">
      <h3>{classInfo.name}</h3>
      <p>{classInfo.description}</p>
      <p>{classInfo.room}</p>
    </div>
  );
};
