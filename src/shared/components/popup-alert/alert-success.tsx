import { Alert } from 'react-bootstrap';

interface IProps {
  message: string;
  onHide: () => void;
}

export const AlertSuccess = ({ message, onHide }: IProps) => {
  return (
    <Alert
      dismissible
      onClose={onHide}
      style={{ marginBottom: 0, width: '100%' }}
      variant="success"
    >
      <Alert.Heading>Thành công :)</Alert.Heading>
      {message}
    </Alert>
  );
};
