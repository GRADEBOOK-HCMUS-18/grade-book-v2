import { Avatar } from 'shared/components';
import { Assignment, StudentGradeInfo } from 'shared/models';
import { TableCell, TableColumn, TableRow } from 'shared/types';
import { Cell, Column } from '../components';

export const buildRows = (
  assignments: Assignment[],
  students: StudentGradeInfo[],
  cellEvent: (params: any) => void
): TableRow[] => {
  const rows: TableRow[] = [];
  students.forEach((student, idx) => {
    const rowId = student.studentId ? student.studentId : `null${idx}`;
    let content: TableRow = {
      id: rowId,
      cells: [
        {
          rowId: rowId,
          columnId: 'id',
          content: (
            <span style={{ padding: '1rem 0.5rem' }}>{student.studentId}</span>
          ),
        },
        {
          rowId: rowId,
          columnId: 'name',
          content: (
            <div
              style={{ padding: '1rem 0.5rem' }}
              className="center-horizontal"
            >
              {/* <Avatar user={student} /> */}
              <span>
                {student.firstName} {student.lastName}
              </span>
            </div>
          ),
        },
      ],
    };
    const gradeCells: TableCell[] = student.grades.map((grade): TableCell => {
      return {
        columnId: grade.assignmentId,
        rowId: rowId,
        content: (
          <Cell
            columnId={grade.assignmentId}
            rowId={rowId}
            content={`${grade.point}/100`}
            isEditAble={!grade.isFinal}
            cellEvent={cellEvent}
          />
        ),
      };
    });
    content.cells.push(...gradeCells);
    rows.push(content);
  });
  return rows;
};

export const buildCols = (
  assignments: Assignment[],
  colEvent: (params: any) => void
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
          content={assignment.name}
          onColClick={colEvent}
        />
      ),
    });
  });

  return cols;
};
