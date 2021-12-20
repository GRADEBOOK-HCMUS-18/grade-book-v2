import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PopUp } from 'shared/components';

interface CellPopUpProps {
  columnId: number | string;
  rowId: number | string;
  isEditAble?: boolean;
  action: (type: string, data: any) => void;
}

export const CellPopUp = ({
  columnId,
  rowId,
  isEditAble,
  action,
}: CellPopUpProps) => {
  const [show, setShow] = useState(false);
  return (
    <PopUp
      show={show}
      onHide={() => setShow(false)}
      placement="bottom-right"
      overlay={
        <div>
          <div
            onClick={() => {
              setShow(false);
              action('markFinal', { studentId: rowId, grade: columnId });
            }}
            className="pop-up-item "
          >
            <span>Đánh dấu là hoàn thành</span>
          </div>
        </div>
      }
    >
      <div className="center-horizontal">
        <div onClick={() => setShow(true)} className="three-dot-btn">
          <BsThreeDotsVertical />
        </div>
      </div>
    </PopUp>
  );
};
