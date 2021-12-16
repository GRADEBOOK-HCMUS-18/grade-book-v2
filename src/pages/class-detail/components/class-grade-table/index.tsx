import { memo, useCallback, useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Table } from 'shared/components';
import { ClassDetailInfo } from 'shared/models';
import { StudentGradeInfo } from 'shared/models';
import { fileService } from 'shared/services';
import { buildCols, buildRows } from './helper';
import 'bootstrap/dist/css/bootstrap.min.css';
interface IProps {
  classInfo: ClassDetailInfo;
}

export const ClassGradeTable = memo(({ classInfo }: IProps) => {
  const [defaultFileType, setFileType] = useState<any>('xlsx');

  useEffect(() => {
    console.log('');
  }, [classInfo]);

  let dofileUpload = useRef<HTMLInputElement | null>(null);

  const { assignments, studentGrades } = classInfo;
  const fileTypes: string[] = ['xlsx', 'csv'];

  const handleColEvent = useCallback((param: any) => {
    //const output = prepareData()
    //const assignmentName = getAssignmentName();
    //const headers = ['studentId', assignementName],
    //fileService.writeFile(headers, content, assignementName , defaultFileType);
  }, []);

  const handleCellEvent = useCallback((params: any) => {
    console.log(params);
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

  const uploadStudentList = (event: any) => {
    event.preventDefault();
    dofileUpload.current?.click();
  };
  const openFile = async (event: any) => {
    const output = await fileService.readFile(event);
    console.log(output);
    //updateStudentGradesInfo(output);
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
              <Dropdown.Item onClick={uploadStudentList}>
                Tải lên danh sách
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="file"
            style={{ display: 'none' }}
            multiple={false}
            accept=".csv,.xlsx,.xls"
            onChange={openFile}
            ref={dofileUpload}
          />
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
