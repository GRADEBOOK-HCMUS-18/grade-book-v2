import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PopUp } from 'shared/components';
import { GradeFilePicker } from './grade-file-picker';

interface ColPopUpProps {
  content: string;
  id: number;
  isTeacher: boolean;
  action: (
    type:
      | 'import'
      | 'export'
      | 'markFinal'
      | 'markUnfinished'
      | 'requestGradeReview',
    data: any
  ) => void;
}

export const ColPopUp = ({ content, id, isTeacher, action }: ColPopUpProps) => {
  const [show, setShow] = useState(false);
  return (
    <PopUp
      show={show}
      onHide={() => setShow(false)}
      placement="bottom-right"
      overlay={
        isTeacher ? (
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
                action('markFinal', { newStatus: true, name: content, id: id });
              }}
              className="pop-up-item "
            >
              <span>Đánh dấu đã hoàn thành</span>
            </div>
            <div
              onClick={() => {
                setShow(false);
                action('markUnfinished', {
                  newStatus: false,
                  name: content,
                  id: id,
                });
              }}
              className="pop-up-item "
            >
              <span>Thu hồi cột điểm</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setShow(false);
              action('requestGradeReview', {
                id: id,
                name: content,
              });
            }}
            className="pop-up-item "
          >
            <span>Phúc khảo</span>
          </div>
        )
      }
    >
      <div onClick={() => setShow(true)} className="three-dot-btn">
        <BsThreeDotsVertical />
      </div>
    </PopUp>
  );
};
