import { Observer } from 'mobx-react-lite';
import { Assignment } from 'shared/models';
import { useEffect, useState } from 'react';
import { PopupAlert } from 'shared/components';
import { classDetailViewModel } from 'shared/view-models';
import { EditGradeStructure } from './components';
import { classGradeViewModel } from './class-grade-view-model';
interface IProps {
  assignments: Assignment[];
}

export const ClassGradeManagement = ({ assignments }: IProps) => {
  const [gradeStructure, setGradeStructure] = useState<Assignment[]>([]);

  useEffect(() => {
    setGradeStructure(assignments);
  }, [assignments]);

  const reorder = async (startIndex: number, finishIndex: number) => {
    const newArray = Array.from(gradeStructure);
    const temp: Assignment = newArray[startIndex];
    newArray.splice(startIndex, 1);
    newArray.splice(finishIndex, 0, temp);
    const orderArray: number[] = newArray.map((item) => item.id);
    setGradeStructure(newArray);
    const result = await classGradeViewModel.reorderGradeStructure(orderArray);
    if (!result) {
      setGradeStructure(assignments);
    }
  };

  const deleteAssignment = (id: number) => {
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
        gradeStructure={gradeStructure}
        updateAssignment={update}
        reorderStructure={reorder}
        deleteAssignment={deleteAssignment}
        addAssignment={create}
      />
      <Observer>
        {() => {
          const { isError, message } = classDetailViewModel;
          return (
            <PopupAlert
              error={isError}
              message={message}
              show={isError}
              onHide={() => classDetailViewModel.deleteError()} //point this right
            />
          );
        }}
      </Observer>
    </div>
  );
};
