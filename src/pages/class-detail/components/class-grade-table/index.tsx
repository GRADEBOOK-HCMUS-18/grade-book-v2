import { memo, useCallback } from 'react';
import { Table } from 'shared/components';
import { ClassDetailInfo } from 'shared/models';
import { buildCols, buildRows } from './helper';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassGradeTable = memo(({ classInfo }: IProps) => {
  const { assignments, students } = classInfo;

  const handleColEvent = useCallback((params: any) => {
    console.log(params);
  }, []);

  const handleCellEvent = useCallback((params: any) => {
    console.log(params);
  }, []);
  return (
    <Table
      columns={buildCols(assignments, handleColEvent)}
      rows={buildRows(assignments, students, handleCellEvent)}
    ></Table>
  );
});
