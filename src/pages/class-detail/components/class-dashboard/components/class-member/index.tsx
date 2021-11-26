import { ClassDetailInfo } from 'shared/models';
import {
  ClassMemberStudent,
  ClassMemberTeacher,
  InsertEmailAddressModal,
} from './components';
import './style/index.css';
import './style/react-multi-email.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassMember = ({ classInfo }: IProps) => {
  return (
    <div>
      <div className="member-container">
        {classInfo.isTeacher ? (
          <>
            <ClassMemberTeacher classInfo={classInfo} />
            <InsertEmailAddressModal />
          </>
        ) : (
          <ClassMemberStudent classInfo={classInfo} />
        )}
      </div>
    </div>
  );
};
