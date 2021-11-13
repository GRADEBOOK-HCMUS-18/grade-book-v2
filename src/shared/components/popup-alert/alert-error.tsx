import { Alert } from 'react-bootstrap';

interface IProps {
  message: string;
  onHide: () => void;
}

export const AlertError = ({ message, onHide }: IProps) => {
  return (
    <Alert
      dismissible
      onClose={onHide}
      style={{ marginBottom: 0, width: '100%' }}
      variant="danger"
    >
      <Alert.Heading>Ôi không lỗi rồi :(</Alert.Heading>
      {message}
    </Alert>
  );
};
