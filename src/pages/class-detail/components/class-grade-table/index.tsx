import { memo, useCallback, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FilePicker, Table } from 'shared/components';
import { ClassDetailInfo } from 'shared/models';
import { StudentGradeInfo } from 'shared/models';
import { fileService } from 'shared/services';
import { GradeTableViewModel } from './grade-table-view-model';
import { buildCols, buildRows } from './helper';

interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassGradeTable = memo(({ classInfo }: IProps) => {
  const [defaultFileType, setFileType] = useState<any>('xlsx');
  const [viewModel] = useState(new GradeTableViewModel());

  const { assignments, studentGrades } = classInfo;
  const fileTypes: string[] = ['xlsx', 'csv'];

  const handleColEvent = useCallback(
    (action: string, params: any) => {
      switch (action) {
        case 'export':
          viewModel.exportGradeCols(
            studentGradesInfo,
            params.name,
            params.id,
            defaultFileType
          );
          break;
        case 'import':
          console.log(action, params);
          break;
        case 'finalize':
          break;
        default:
          break;
      }
    },
    [defaultFileType, viewModel]
  );

  const handleCellEvent = useCallback((action: string, params: any) => {
    console.log(action, params);
  }, []);

  const changeFileType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFileType(value);
  };

  const downloadTemplateFile = (event: any) => {
    event.preventDefault();
    const headers = ['StudentId', 'Fullname'];
    const content = studentGradesInfo.map(
      (item): Array<string> => [
        item.studentId.toString(),
        `${item.firstName} ${item.lastName}`,
      ]
    );
    fileService.writeFile(headers, content, 'sample_file', defaultFileType);
  };

  const uploadStudentList = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="d-flex justify-content-end ">
        <div className="d-flex flex-row mr-auto my-4">
          <select
            className="form-select mx-2"
            onChange={changeFileType}
            aria-label="Default select example"
            value={defaultFileType}
          >
            {fileTypes.map((item, index) => (
              <option key={`${item}${index}`} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              File
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Tải xuống toàn bộ</Dropdown.Item>
              <Dropdown.Item onClick={downloadTemplateFile}>
                Tải xuống danh sách
              </Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>

              <FilePicker
                content="Tải lên danh sách"
                onFinish={uploadStudentList}
                acceptTypes={['xlsx', 'csv', 'xls']}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Table
        columns={buildCols(assignments, handleColEvent)}
        rows={buildRows(assignments, studentGradesInfo, handleCellEvent)}
      ></Table>
    </>
  );
});

const studentGradesInfo: StudentGradeInfo[] = [
  {
    studentId: '18120096',
    firstName: 'Trương Đại',
    lastName: 'Triều',
    accountId: '123',
    grades: [
      {
        assignmentId: 1,
        point: 10,
        isFinal: false,
      },
      {
        assignmentId: 2,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 3,
        point: 10,
        isFinal: true,
      },
    ],
  },
  {
    studentId: '18120154',
    firstName: 'Võ Thiện',
    lastName: 'An',
    accountId: '1234',
    grades: [
      {
        assignmentId: 1,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 2,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 3,
        point: 10,
        isFinal: true,
      },
    ],
  },
  {
    studentId: '18120180',
    firstName: 'Võ Xuân',
    lastName: 'Hòa',
    accountId: '443',
    grades: [
      {
        assignmentId: 1,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 2,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 3,
        point: 10,
        isFinal: true,
      },
    ],
  },
];
