import { useRef, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
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
  const [value, setValue] = useState(content);
  let inputRef: any = useRef(null);

  useEffect(() => {
    if (content === null) {
      setIsEmpty(true);
    } else {
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

    if (value !== content?.toString()) {
      setIsLoading(true);
      if (cellEvent) {
        cellEvent('edit', {
          colId: columnId,
          rowId: rowId,
          value: event.target.value,
        });
      }
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleOnChange = (event: any) => {
    const value: string = event.target.value.trim();
    setValue(value);
  };
  return (
    <div className="cell-container">
      <input
        disabled={!editAble}
        onFocus={() => setIsEmpty(false)}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        type="text"
        ref={(e) => (inputRef = e)}
        onKeyDown={handleKeyDown}
        className="cell-input"
        value={value ? value : ''}
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
    </div>
  );
};
