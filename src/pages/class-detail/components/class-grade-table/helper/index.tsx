import { Avatar } from 'shared/components';
import { Assignment, User } from 'shared/models';
import { TableColumn, TableRow } from 'shared/types';
import { Cell, Column } from '../components';

export const buildRows = (
  assignments: Assignment[],
  students: User[],
  cellEvent: (params: any) => void
): TableRow[] => {
  const rows: TableRow[] = [];
  students.forEach((student, idx) => {
    const rowId = student.studentIdentification
      ? student.studentIdentification
      : `null${idx}`;

    rows.push({
      id: rowId,
      cells: [
        {
          rowId: rowId,
          columnId: 'id',
          content: (
            <span style={{ padding: '1rem 0.5rem' }}>
              {student.studentIdentification}
            </span>
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
              <Avatar user={student} />
              <span>
                {student.firstName} {student.lastName}
              </span>
            </div>
          ),
        },
      ],
    });
  });

  rows.forEach((row) => {
    assignments.forEach((assignment) => {
      row.cells.push({
        columnId: assignment.id,
        rowId: row.id,
        content: (
          <Cell
            columnId={assignment.id}
            rowId={row.id}
            content={`0/${assignment.point}`}
            cellEvent={cellEvent}
          />
        ),
      });
    });
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
