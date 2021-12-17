import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FilePicker, PopUp } from 'shared/components';
import './index.css';

interface ColProps {
  content: string;
  id: number;
  onColClick: (action: string, params: any) => void;
}
export const Column = ({ content, id, onColClick }: ColProps) => {
  const [show, setShow] = useState(false);

  const handleImport = (data: any) => {
    onColClick('import', { data: data });
  };

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
              onColClick('export', { name: content, id: id });
            }}
            className="pop-up-item "
          >
            <span>Export</span>
          </div>
          <FilePicker
            content="Import"
            onFinish={handleImport}
            acceptTypes={['xlsx', 'csv', 'xls']}
          />
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
