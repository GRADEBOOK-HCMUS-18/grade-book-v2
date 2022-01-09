import { Spinner } from 'react-bootstrap';

export const NotificationSpinner = () => {
  return (
    <>
      <Spinner size="sm" animation="border" role="status"></Spinner>
      <span className="ms-3"> Đang tải...</span>
    </>
  );
};
