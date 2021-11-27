import { useState } from 'react';
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
        <p>Cuối kì: 70</p>
        <p>Giữa kì: 30</p>
      </div>
    </div>
  );
};
