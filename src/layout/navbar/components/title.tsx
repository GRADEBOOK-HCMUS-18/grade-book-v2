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
          <img
            style={{ height: 30, marginLeft: 20 }}
            src={logo}
            alt="Lớp học"
          ></img>
          <span style={{ marginLeft: 10 }}>Lớp học</span>
        </div>
      );
    case '/setting':
      return <span style={marginStyle}>Cài đặt</span>;
    case '/archived':
      return <span style={marginStyle}>Lớp học đã lưu trữ</span>;
    case '/calendar':
      return <span style={marginStyle}>Lịch</span>;
    case '/profile':
      return <span style={marginStyle}>Hồ sơ</span>;
    default:
      return (
        <span style={marginStyle}>{classDetailViewModel.classInfo.name}</span>
      );
  }
});
