import { Assignment, GradeInfo, StudentGradeInfo } from 'shared/models';
import { TableCell, TableColumn, TableRow } from 'shared/types';
import { Cell, Column } from '../components';

export const buildRows = (
  studentGrades: StudentGradeInfo[],
  cellEvent: (action: string, params: any) => void,
  isClassOwner: boolean
): TableRow[] => {
  let rows: TableRow[] = [];

  if (isClassOwner) {
    rows = buildRowForTeacher(studentGrades, cellEvent);
  } else {
    if (studentGrades.length) {
      if (studentGrades[0].student === null) return rows;
      rows = buildRowForStudent(studentGrades[0]);
    }
  }

  return rows;
};

export const buildCols = (
  assignments: Assignment[],
  studentGrades: StudentGradeInfo[],
  colEvent: (action: string, params: any) => void,
  isOwner: boolean
): TableColumn[] => {
  let cols: TableColumn[] = [];
  if (isOwner) {
    cols = buildColsForTeacher(assignments, colEvent, isOwner);
  } else {
    if (studentGrades.length) {
      if (studentGrades[0].student === null) return cols;
      cols = buildColsForStudent(
        assignments,
        studentGrades[0],
        colEvent,
        isOwner
      );
    }
  }

  return cols;
};

export const buildColsForTeacher = (
  assignments: Assignment[],
  colEvent: (action: string, params: any) => void,
  isOwner: boolean
): TableColumn[] => {
  const cols: TableColumn[] = [];

  cols.push(
    {
      id: 'id',
      content: <span className="table-col">MSSV</span>,
    },
    {
      id: 'name',
      content: <span className="center-horizontal table-col">Họ và tên</span>,
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
          isTeacher={isOwner}
        />
      ),
    });
  });

  cols.push({
    id: 'total',
    content: (
      <span className="center-horizontal table-col ">Điểm tổng kết</span>
    ),
  });
  return cols;
};

export const buildColsForStudent = (
  assignments: Assignment[],
  studentGrade: StudentGradeInfo,
  colEvent: (action: string, params: any) => void,
  isOwner: boolean
): TableColumn[] => {
  const cols: TableColumn[] = [];

  cols.push(
    {
      id: 'id',
      content: <span className="table-col">MSSV</span>,
    },
    {
      id: 'name',
      content: <span className="center-horizontal table-col">Họ và tên</span>,
    }
  );
  const assignemtGrades = studentGrade.grades;
  assignments.forEach((assignment) => {
    const assignmentGrade = assignemtGrades.find(
      (item) => item.assignmentId === assignment.id
    );
    const content =
      assignmentGrade && assignmentGrade?.studentPoint !== null ? (
        <Column
          id={assignment.id}
          content={`${assignment.name} (${assignment.point})`}
          onColClick={colEvent}
          isTeacher={isOwner}
        />
      ) : (
        <span className="center-horizontal table-col ">
          {`${assignment.name} (${assignment.point})`}
        </span>
      );
    cols.push({
      id: assignment.id,
      content: content,
    });
  });

  cols.push({
    id: 'total',
    content: (
      <span className="center-horizontal table-col ">Điểm tổng kết</span>
    ),
  });
  return cols;
};

const buildRowForTeacher = (
  studentGrades: StudentGradeInfo[],
  cellEvent: (action: string, params: any) => void
) => {
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
    const avgGrade = calculateAvergageGrade(gradeItem.grades);
    cells.push({
      rowId: student.studentId,
      columnId: 'total',
      content: <span style={{ padding: '1rem' }}>{avgGrade}</span>,
    });
    rows.push({
      id: student.studentId,
      cells: cells,
    });
  });

  return rows;
};

const buildRowForStudent = (studentGrade: StudentGradeInfo) => {
  const rows: TableRow[] = [];
  const cells: TableCell[] = [];
  const { student } = studentGrade;

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

  studentGrade.grades.forEach((grade) => {
    cells.push({
      rowId: student.studentId,
      columnId: grade.assignmentId,
      content: (
        <Cell
          content={grade.studentPoint}
          columnId={grade.assignmentId}
          rowId={student.studentId}
          isEditAble={false}
        />
      ),
    });
  });
  const avgGrade = calculateAvergageGrade(studentGrade.grades);
  cells.push({
    rowId: student.studentId,
    columnId: 'total',
    content: <span style={{ padding: '1rem' }}>{avgGrade}</span>,
  });
  rows.push({
    id: student.studentId,
    cells: cells,
  });

  return rows;
};

const calculateAvergageGrade = (grade: GradeInfo[]): number => {
  if (grade.length === 0) return 0;
  const [totalGrade, totalWeight] = grade.reduce(function (
    prev,
    curVal
  ): Array<number> {
    let newVal = prev[0];
    if (curVal?.studentPoint !== null)
      newVal = newVal + curVal?.studentPoint * curVal.assignmentWeight;
    return [newVal, prev[1] + curVal.assignmentWeight];
  },
  new Array<number>(0, 0));
  const avgGrade: number = Math.round((totalGrade / totalWeight) * 100) / 100;
  return avgGrade;
};
