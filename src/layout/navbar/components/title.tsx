import { CSSProperties } from 'react';
import { centerHorizontal } from 'shared/styles';
import logo from 'assets/images/logo.png';
import { classDetailViewModel } from 'shared/view-models';
import { observer } from 'mobx-react';

interface IProps {
  pathName: string;
}

export const Title = observer(({ pathName }: IProps) => {
  const marginStyle: CSSProperties = {
    marginLeft: 20,
  };

  switch (pathName) {
    case '/':
      return (
        <div style={centerHorizontal}>
          <img style={{ height: 30 }} src={logo} alt="Lớp học"></img>
          <span style={{ marginLeft: 10 }}>Lớp học</span>
        </div>
      );
    case '/setting':
      return <span>Cài đặt</span>;
    case '/archived':
      return <span>Lớp học đã lưu trữ</span>;
    case '/calendar':
      return <span>Lịch</span>;
    case '/profile':
      return <span>Hồ sơ</span>;
    default:
      return <span>{classDetailViewModel.classInfo.name}</span>;
  }
});
