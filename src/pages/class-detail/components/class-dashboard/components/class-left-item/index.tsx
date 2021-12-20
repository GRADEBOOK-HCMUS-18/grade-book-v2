import { useMemo, useState } from 'react';
import { AiOutlineRedo } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { PopUp } from 'shared/components';
import { ClassDetailInfo } from 'shared/models';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassLeftItem = ({ classInfo }: IProps) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const total = useMemo(() => {
    let sum = 0;
    classInfo.assignments.forEach((assignment) => {
      sum += assignment.point;
    });
    return sum;
  }, [classInfo.assignments]);
  return (
    <div className="class-post-left-item">
      {classInfo.isTeacher && (
        <div className="class-id-info">
          <div>
            <p className="class-left-title">Mã lớp</p>
            <p>{classInfo.inviteStringStudent}</p>
          </div>
          <PopUp
            show={showPopUp}
            onHide={() => setShowPopUp(false)}
            placement="bottom-right"
            overlay={
              <div>
                <div className="pop-up-item ">
                  <MdContentCopy style={{ marginRight: 10 }} size={25} />
                  <span>Sao chép mã lớp</span>
                </div>
                <div className="pop-up-item ">
                  <AiOutlineRedo style={{ marginRight: 10 }} size={25} />
                  <span>Đặt lại mã lớp</span>
                </div>
              </div>
            }
          >
            <BsThreeDotsVertical
              onClick={() => setShowPopUp(!showPopUp)}
              className="dot-btn"
              size={30}
            ></BsThreeDotsVertical>
          </PopUp>
        </div>
      )}
      <div>
        <p className="class-left-title">Cấu trúc điểm</p>
        <ul>
          {classInfo.assignments.map((assignment) => (
            <li key={assignment.id}>
              {assignment.name}: {assignment.point} điểm
            </li>
          ))}
        </ul>
        <b key="total">Tổng điểm: {total}</b>
        {!classInfo.assignments.length && (
          <p>Lớp học này chưa có cấu trúc điểm</p>
        )}
      </div>
    </div>
  );
};
