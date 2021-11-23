import { observer } from 'mobx-react';
import { ClassDetailInfo } from 'shared/models';
import { lineLoadingViewModel } from 'shared/view-models';
import './style/index.css';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassDashboard = observer(({ classInfo }: IProps) => {
  return (
    <>
      {lineLoadingViewModel.isLoading ? (
        <></>
      ) : (
        <div className="class-info">
          <h3>{classInfo.name}</h3>
          <p>{classInfo.description}</p>
          <p>{classInfo.room}</p>
        </div>
      )}
    </>
  );
});
