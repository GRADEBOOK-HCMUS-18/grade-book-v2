import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FilePicker, PopupAlert, SnackBar, Table } from 'shared/components';
import { ClassDetailInfo } from 'shared/models';
import { StudentGradeInfo } from 'shared/models';
import { fileService } from 'shared/services';
import { GradeTableViewModel } from './grade-table-view-model';
import { buildCols, buildRows } from './helper';

interface IProps {
  classInfo: ClassDetailInfo;
}

const fileTypes: string[] = ['xlsx', 'csv'];

export const ClassGradeTable = observer(({ classInfo }: IProps) => {
  const [defaultFileType, setFileType] = useState<any>('xlsx');
  const [viewModel] = useState(new GradeTableViewModel());
  const [success, setSuccess] = useState(false);

  const { assignments } = classInfo;

  const uploadGradeList = useCallback(
    async (data: any, id: number) => {
      const result = await viewModel.importStudentGrade(data, classInfo.id, id);
      if (result) {
        console.log(result);
        setSuccess(true);
      }
    },
    [viewModel, classInfo.id]
  );

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
          uploadGradeList(params.data, params.id);
          break;
        case 'finalize':
          break;
        default:
          break;
      }
    },
    [defaultFileType, uploadGradeList, viewModel]
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

  const uploadStudentList = async (data: any) => {
    const result = await viewModel.importStudentList(data, classInfo.id);
    if (result) {
      console.log(result);
      setSuccess(true);
    }
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
      <SnackBar
        show={success}
        type="success"
        message="Thanh cong"
        onClose={() => setSuccess(false)}
      />
      <PopupAlert
        show={viewModel.isError}
        error={viewModel.isError}
        message={viewModel.message}
        onHide={() => viewModel.deleteError()}
      />
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
        assignmentId: 14,
        point: 10,
        isFinal: false,
      },
      {
        assignmentId: 15,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 16,
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
        assignmentId: 14,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 15,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 16,
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
        assignmentId: 14,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 15,
        point: 10,
        isFinal: true,
      },
      {
        assignmentId: 16,
        point: 10,
        isFinal: true,
      },
    ],
  },
];
