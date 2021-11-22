import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { Avatar } from 'shared/components';
import { ClassDetailInfo } from 'shared/models';
import { NoStudent } from './no-student';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassMemberTeacher = ({ classInfo }: IProps) => {
  const { mainTeacher, subTeachers, students } = classInfo;

  return (
    <>
      <div className="member-header-container">
        <h3>Giáo viên</h3>
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            <Tooltip id="tooltip-bottom">Thêm giáo viên vào lớp</Tooltip>
          }
        >
          <div className="add-user-btn">
            <HiOutlineUserAdd size={25} />
          </div>
        </OverlayTrigger>
      </div>
      <div className="member-list">
        <div className="member-info">
          <Avatar size={50} user={mainTeacher} />
          <span>
            {mainTeacher.lastName} {mainTeacher.firstName}
          </span>
        </div>
        {subTeachers.map((teacher) => (
          <div className="member-info">
            <Avatar size={50} user={teacher} />
            <span>
              {teacher.lastName} {teacher.firstName}
            </span>
          </div>
        ))}
      </div>
      <div className="member-header-container">
        <h3>Sinh viên</h3>
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            <Tooltip id="tooltip-bottom">Thêm sinh viên vào lớp</Tooltip>
          }
        >
          <div className="add-user-btn">
            <HiOutlineUserAdd size={25} />
          </div>
        </OverlayTrigger>
      </div>
      {students.length ? (
        <div className="member-list">
          {students.map((student) => (
            <div className="member-info">
              <Avatar size={50} user={student} />
              <span>
                {student.lastName} {student.firstName}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <NoStudent message="Lớp học hiện tại chưa có sinh viên nào" />
      )}
    </>
  );
};
