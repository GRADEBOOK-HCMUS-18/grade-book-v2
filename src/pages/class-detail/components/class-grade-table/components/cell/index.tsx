import { useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './index.css';

interface CellProps {
  columnId: number;
  rowId: number;
  content: string | number;
  isEditAble?: boolean;
}

export const Cell = ({ content, columnId, rowId }: CellProps) => {
  const [isLoading, setIsLoading] = useState(false);
  let inputRef: any = useRef(null);
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      inputRef.blur();

      setTimeout(() => setIsLoading(false), 1000);
    }
  };
  return (
    <div className="cell-container">
      <input
        ref={(e) => (inputRef = e)}
        onKeyDown={handleKeyDown}
        className="cell-input"
        defaultValue={content}
      ></input>
      {isLoading && (
        <div className="cell-spinner-container">
          <Spinner size="sm" animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};
