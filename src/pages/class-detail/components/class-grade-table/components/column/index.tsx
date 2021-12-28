import { ColPopUp } from './components';
import './index.css';

interface ColProps {
  content: string;
  id: number;
  onColClick?: (action: string, params: any) => void;
}

export const Column = ({ content, id, onColClick }: ColProps) => {
  const handleAction = (
    type: 'import' | 'export' | 'markFinal' | 'markUnfinished',
    data: any
  ) => {
    if (onColClick) {
      onColClick(type, { data: data, id: id, name: content });
    }
  };
  return (
    <>
      {onColClick ? (
        <ColPopUp content={content} id={id} action={handleAction} />
      ) : (
        <div style={{ padding: '1rem' }}>{content}</div>
      )}
    </>
  );
};
