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
        case 'markFinal':
          gradeTableViewModel.updateGradeColStatus(
            params.newStatus,
            classInfo.id,
            params.id
          );
          break;
        case 'markUnfinished':
          gradeTableViewModel.updateGradeColStatus(
            params.newStatus,
            classInfo.id,
            params.id
          );
          break;
        default:
          break;
      }
    },
    [defaultFileType, uploadGradeList, studentGrades]
  );

  const handleCellEvent = useCallback((action: string, params: any) => {
    switch (action) {
      case 'edit':
        gradeTableViewModel.updateSingleStudentGrade(
          params.value,
          params.newStatus,
          classInfo.id,
          params.colId,
          params.rowId
        );
        break;
      case 'markFinal':
        gradeTableViewModel.updateSingleStudentGrade(
          params.newStaus,
          params.value,
          classInfo.id,
          params.assignmentId,
          params.studentId
        );
        break;

      default:
        break;
    }
  }, []);

  const changeFileType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFileType(value);
  };

  const exportGradeTable = () => {
    gradeTableViewModel.exportGradeTable(
      studentGrades,
      assignments,
      defaultFileType
    );
  };

  const downloadTemplateFile = (type: 'student' | 'grade') => {
    const headers = type === 'student' ? ['MSSV', 'Họ tên'] : ['MSSV', 'Điểm'];
    fileService.writeFile(headers, Array(0), 'sample_file', defaultFileType);
  };

  const uploadStudentList = async (data: any) => {
    const result = await gradeTableViewModel.importStudentList(
      data,
      classInfo.id
    );
    if (result) {
      setSuccess(true);
    }
  };

  const markTableFinished = () => {
    gradeTableViewModel.updateTableStatus(true, classInfo.id);
  };

  return (
    <>
      {classInfo.isTeacher && (
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
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                File
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={exportGradeTable}>
                  Tải xuống toàn bộ bảng điểm
                </Dropdown.Item>

                <Dropdown.Item onClick={() => downloadTemplateFile('student')}>
                  Tải xuống template danh sách sinh viên
                </Dropdown.Item>

                <Dropdown.Item onClick={() => downloadTemplateFile('grade')}>
                  Tải xuống template cột điểm
                </Dropdown.Item>

                <Dropdown.Item as="div">
                  <FilePicker
                    content="Tải lên danh sách sinh viển"
                    onFinish={uploadStudentList}
                    acceptTypes={['xlsx', 'csv', 'xls']}
                  />
                </Dropdown.Item>

                <Dropdown.Item onClick={() => markTableFinished()}>
                  Đánh dấu bảng điểm đã hoàn thành
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}

      <Table
        columns={buildCols(assignments, handleColEvent, classInfo.isTeacher)}
        rows={buildRows(studentGrades, handleCellEvent, classInfo.isTeacher)}
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
