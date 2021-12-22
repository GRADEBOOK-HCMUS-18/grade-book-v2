import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PopUp } from 'shared/components';
import { GradeFilePicker } from './grade-file-picker';

interface ColPopUpProps {
  content: string;
  id: number;
  action: (type: 'import' | 'export' | 'markFinal', data: any) => void;
}

export const ColPopUp = ({ content, id, action }: ColPopUpProps) => {
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

              action('export', { name: content, id: id });
            }}
            className="pop-up-item "
          >
            <span>Export cột điểm ra file</span>
          </div>
          <div className="pop-up-item ">
            <GradeFilePicker
              content="Import cột điểm từ file"
              onFinish={(data) => {
                setShow(false);
                action('import', data);
              }}
              acceptTypes={['xlsx', 'csv', 'xls']}
            />
          </div>
          <div
            onClick={() => {
              setShow(false);
              action('markFinal', { name: content, id: id });
            }}
            className="pop-up-item "
          >
            <span>Đánh dấu là hoàn thành</span>
          </div>
        </div>
      }
    >
      <div className="center-horizontal table-col">
        <span>{content}</span>
        <div onClick={() => setShow(true)} className="three-dot-btn">
          <BsThreeDotsVertical />
        </div>
      </div>
    </PopUp>
  );
};
