import { Link } from 'react-router-dom';
import { ClassDetailInfo } from 'shared/models';
import { IoArrowBackOutline } from 'react-icons/io5';
import { ClassMemberStudent } from './class-member-student';
import { ClassMemberTeacher } from './class-member-teacher';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
  backUrl: string;
}

export const ClassMember = ({ classInfo, backUrl }: IProps) => {
  return (
    <div className="member-container">
      {classInfo.isTeacher ? (
        <ClassMemberTeacher classInfo={classInfo} />
      ) : (
        <ClassMemberStudent classInfo={classInfo} />
      )}
    </div>
  );
};
