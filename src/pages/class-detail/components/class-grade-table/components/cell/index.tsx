import { useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './index.css';

interface CellProps {
  columnId: number | string;
  rowId: number | string;
  content: string | number | null;
  isEditAble?: boolean;
  cellEvent: (params: any) => void;
}

export const Cell = ({
  content,
  columnId,
  rowId,
  cellEvent,
  isEditAble,
}: CellProps) => {
  const [isLoading, setIsLoading] = useState(false);
  let inputRef: any = useRef(null);
  let editAble = true;
  if (isEditAble !== undefined) {
    editAble = isEditAble;
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      inputRef.blur();
      cellEvent({ colId: columnId, rowId: rowId, value: event.target.value });
      setTimeout(() => setIsLoading(false), 1000);
    }
  };
  return (
    <div className="cell-container">
      <input
        disabled={!editAble}
        ref={(e) => (inputRef = e)}
        onKeyDown={handleKeyDown}
        className="cell-input"
        defaultValue={content ? content : ''}
      ></input>
      {isLoading && (
        <div className="cell-spinner-container">
          <Spinner size="sm" animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};
