import { Assignment, StudentGradeInfo } from 'shared/models';
import { TableCell, TableColumn, TableRow } from 'shared/types';
import { Cell, Column } from '../components';

export const buildRows = (
  studentGrades: StudentGradeInfo[],
  cellEvent: (action: string, params: any) => void
): TableRow[] => {
  console.log('build row');
  const rows: TableRow[] = [];
  studentGrades.forEach((gradeItem) => {
    const cells: TableCell[] = [];
    const { student } = gradeItem;
    cells.push(
      {
        rowId: student.studentId,
        columnId: 'MSSV',
        content: <span style={{ padding: '1rem' }}>{student.studentId}</span>,
      },
      {
        rowId: student.studentId,
        columnId: 'Ho ten',
        content: <span style={{ padding: '1rem' }}>{student.fullName}</span>,
      }
    );

    gradeItem.grades.forEach((grade) => {
      cells.push({
        rowId: student.studentId,
        columnId: grade.assignmentId,
        content: (
          <Cell
            content={grade.studentPoint}
            columnId={grade.assignmentId}
            rowId={student.studentId}
            isEditAble={!grade.isFinal}
            cellEvent={cellEvent}
          />
        ),
      });
    });

    rows.push({
      id: student.studentId,
      cells: cells,
    });
  });
  console.log(rows);
  return rows;
};

export const buildCols = (
  assignments: Assignment[],
  colEvent: (action: string, params: any) => void
): TableColumn[] => {
  const cols: TableColumn[] = [];

  cols.push(
    {
      id: 'id',
      content: <span style={{ padding: '1rem 0.5rem' }}>MSSV</span>,
    },
    {
      id: 'name',
      content: <span style={{ padding: '1rem 0.5rem' }}>Họ và tên</span>,
    }
  );

  assignments.forEach((assignment) => {
    cols.push({
      id: assignment.id,
      content: (
        <Column
          id={assignment.id}
          content={`${assignment.name} (${assignment.point})`}
          onColClick={colEvent}
        />
      ),
    });
  });

  return cols;
};
