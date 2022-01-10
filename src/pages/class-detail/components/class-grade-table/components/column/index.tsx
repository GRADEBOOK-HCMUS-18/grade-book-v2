import { ColPopUp } from './components';
import './index.css';

interface ColProps {
  content: string;
  id: number;
  onColClick: (action: string, params: any) => void;
  isTeacher: boolean;
}

export const Column = ({ content, id, onColClick, isTeacher }: ColProps) => {
  const handleAction = (
    type:
      | 'import'
      | 'export'
      | 'markFinal'
      | 'markUnfinished'
      | 'requestGradeReview',
    data: any
  ) => {
    if (onColClick) {
      onColClick(type, { data: data, id: id, name: content });
    }
  };
  return (
    <>
      <div className="center-horizontal table-col">
        <span style={{ marginRight: '0.3rem' }}>{content}</span>
        <ColPopUp
          content={content}
          id={id}
          action={handleAction}
          isTeacher={isTeacher}
        />
      </div>
    </>
  );
};
