import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PopUp } from 'shared/components';
import './index.css';

interface ColProps {
  content: string;
  id: number;
  onColClick: (content: string, id: number) => void;
}
export const Column = ({ content, id, onColClick }: ColProps) => {
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
              onColClick(content, id);
            }}
            className="pop-up-item "
          >
            <span>Export</span>
          </div>
          <div
            onClick={() => {
              setShow(false);
              onColClick(content, id);
            }}
            className="pop-up-item "
          >
            <span>Import</span>
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
