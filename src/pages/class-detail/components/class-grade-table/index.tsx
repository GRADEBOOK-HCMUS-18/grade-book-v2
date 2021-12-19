import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FilePicker, PopupAlert, SnackBar, Table } from 'shared/components';
import { ClassDetailInfo } from 'shared/models';
import { fileService } from 'shared/services';
import { gradeTableViewModel } from './grade-table-view-model';
import { buildCols, buildRows } from './helper';

interface IProps {
  classInfo: ClassDetailInfo;
}

const fileTypes: string[] = ['xlsx', 'csv'];

export const ClassGradeTable = observer(({ classInfo }: IProps) => {
  const [defaultFileType, setFileType] = useState<any>('xlsx');

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    gradeTableViewModel.getGradeTable(classInfo.id);
  }, [classInfo.id]);

  const { assignments } = classInfo;
  const { studentGrades } = gradeTableViewModel;

  const uploadGradeList = useCallback(
    async (data: any, id: number) => {
      const result = await gradeTableViewModel.importStudentGrade(
        data,
        classInfo.id,
        id
      );
      if (result) {
        console.log(result);
        setSuccess(true);
      }
    },
    [classInfo.id]
  );

  const handleColEvent = useCallback(
    (action: string, params: any) => {
      switch (action) {
        case 'export':
          gradeTableViewModel.exportGradeCols(
            studentGrades,
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
    [defaultFileType, uploadGradeList, studentGrades]
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
    const content = studentGrades.map(
      (item): Array<string> => [
        item.student.studentId.toString(),
        `${item.student.fullName} `,
      ]
    );
    fileService.writeFile(headers, content, 'sample_file', defaultFileType);
  };

  const uploadStudentList = async (data: any) => {
    const result = await gradeTableViewModel.importStudentList(
      data,
      classInfo.id
    );
    if (result) {
      console.log(result);
      setSuccess(true);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-start ">
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
        rows={buildRows(studentGrades, handleCellEvent)}
      ></Table>
      <SnackBar
        show={success}
        type="success"
        message="Thành công"
        onClose={() => setSuccess(false)}
      />
      <PopupAlert
        show={gradeTableViewModel.isError}
        error={gradeTableViewModel.isError}
        message={gradeTableViewModel.message}
        onHide={() => gradeTableViewModel.deleteError()}
      />
    </>
  );
});
