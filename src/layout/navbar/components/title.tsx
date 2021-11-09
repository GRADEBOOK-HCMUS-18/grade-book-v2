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
          <h4 style={{ marginLeft: 10 }}>Lớp học</h4>
        </div>
      );
    case '/setting':
      return <h4 style={marginStyle}>Cài đặt</h4>;
    case '/archived':
      return <h4 style={marginStyle}>Lớp học đã lưu trữ</h4>;
    case '/calendar':
      return <h4 style={marginStyle}>Lịch</h4>;

    default:
      return <h4 style={marginStyle}>{classViewModel.getClass().className}</h4>;
  }
};
