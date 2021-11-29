import { observer } from 'mobx-react';
import { Assignment } from 'shared/models';
import { EditGradeStructure } from './components';
import { classGradeViewModel } from './class-grade-view-model';

interface IProps {
  assignments: Assignment[];
}

export const ClassGradeManagement = observer(({ assignments }: IProps) => {
  const reorder = (startIndex: number, finishIndex: number) => {
    classGradeViewModel.reorderGradeStructure(startIndex, finishIndex);
  };

  const deleteAssignment = (id: number) => {
    console.log('delete');
    classGradeViewModel.deleteGradeCategory(id);
  };

  const update = (id: number, value: Assignment) => {
    classGradeViewModel.updateGradeCategory(id, value);
  };

  const create = (value: Assignment) => {
    classGradeViewModel.addGradeCategory(value);
  };
  return (
    <div className="container p-0">
      <EditGradeStructure
        gradeStructure={assignments}
        updateAssignment={update}
        reorderStructure={reorder}
        deleteAssignment={deleteAssignment}
        addAssignment={create}
      />
    </div>
  );
});
