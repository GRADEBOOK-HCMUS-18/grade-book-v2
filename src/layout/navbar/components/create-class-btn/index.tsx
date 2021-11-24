import { observer } from 'mobx-react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { PopUp } from 'shared/components';
import { classActionViewModel } from 'shared/view-models';

export const CreateClassButton = observer(() => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <PopUp
      show={showPopUp}
      onHide={() => setShowPopUp(false)}
      placement="bottom-left"
      overlay={
        <div className="center-vertical">
          <button
            type="button"
            onClick={() => {
              setShowPopUp(false);
              classActionViewModel.setShowJoinClassModal(true);
            }}
            className="list-group-item list-group-item-action"
          >
            Tham gia lớp học
          </button>
          <button
            type="button"
            onClick={() => {
              setShowPopUp(false);
              classActionViewModel.setShowCreateClassModal(true);
            }}
            className="list-group-item list-group-item-action"
          >
            Tạo lớp học
          </button>
        </div>
      }
    >
      <button
        onClick={() => setShowPopUp(!showPopUp)}
        className="btn-floating py-0 my-0"
      >
        <AiOutlinePlus size={25} />
      </button>
    </PopUp>
  );
});
