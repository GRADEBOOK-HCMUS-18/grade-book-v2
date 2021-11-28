import { observer } from 'mobx-react';
import { EditGradeStructure } from './components/edit-grade-structure';
import './style/index.css';

export const ClassGradeManagement = observer(() => {
  return (
    <div className="container p-0">
      <EditGradeStructure />
    </div>
  );
});
