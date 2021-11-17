import { CSSProperties } from 'react';
import logo from 'assets/images/logo.png';
import { centerHorizontal } from 'shared/styles';
import { classViewModel } from 'shared/view-models';

interface IProps {
  pathName: string;
}

export const Title = ({ pathName }: IProps) => {
  const marginStyle: CSSProperties = {
    marginLeft: 20,
  };

  switch (pathName) {
    case '/class':
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

    default:
      return (
        <span style={marginStyle}>{classViewModel.getClass().name}</span>
      );
  }
};
