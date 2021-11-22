import { ClassDetailInfo } from 'shared/models';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassMemberStudent = ({ classInfo }: IProps) => {
  return (
    <div>
      <div className="member-header-container">
        <h3></h3>
      </div>
    </div>
  );
};
