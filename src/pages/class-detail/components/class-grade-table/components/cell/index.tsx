import { useRef, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { CellPopUp } from './components';
import './index.css';

interface CellProps {
  columnId: number | string;
  rowId: number | string;
  content: string | number | null;
  isEditAble?: boolean;
  cellEvent?: (action: string, params: any) => void;
}

export const Cell = ({
  content,
  columnId,
  rowId,
  cellEvent,
  isEditAble,
}: CellProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [value, setValue] = useState<any>('');
  let inputRef: any = useRef(null);

  useEffect(() => {
    if (content === null) {
      setIsEmpty(true);
    } else {
      setValue(content);
      setIsEmpty(false);
    }
  }, [content]);
  let editAble = true;
  if (isEditAble !== undefined) {
    editAble = isEditAble;
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      inputRef.blur();
    }
  };

  const handleOnBlur = (event: any) => {
    if (value === '' || value === null) {
      setIsEmpty(true);
      return;
    }

    if (value.toString() !== content?.toString()) {
      setIsLoading(true);
      if (cellEvent) {
        cellEvent('edit', {
          colId: columnId,
          rowId: rowId,
          value: event.target.value,
          newStatus: false,
        });
      }
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleOnChange = (event: any) => {
    const value: string = event.target.value.trim();
    setValue(value);
  };
  const handlePopUpAction = (type: string, data: any) => {
    setIsLoading(true);
    if (cellEvent) {
      cellEvent('markFinal', {
        colId: columnId,
        rowId: rowId,
        value: value,
        newStatus: true,
      });
    }
    setTimeout(() => setIsLoading(false), 1000);
  };
  return (
    <div
      onMouseOver={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
      className="cell-container"
    >
      <input
        onFocus={() => setIsEmpty(false)}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        type="text"
        ref={(e) => (inputRef = e)}
        onKeyDown={handleKeyDown}
        className="cell-input"
        value={value ? value : ''}
        disabled={!editAble}
      ></input>
      {isEmpty && (
        <span onClick={() => inputRef.focus()} className="missing-grade">
          Trống
        </span>
      )}
      {isLoading && (
        <div className="cell-spinner-container">
          <Spinner size="sm" animation="border" variant="primary" />
        </div>
      )}
      {content && showAction && isEditAble && (
        <CellPopUp
          columnId={columnId}
          rowId={rowId}
          action={handlePopUpAction}
        />
      )}
    </div>
  );
};
