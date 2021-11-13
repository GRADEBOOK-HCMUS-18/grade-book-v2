import { Modal } from 'react-bootstrap';
import { AlertError } from './alert-error';
import { AlertSuccess } from './alert-success';

interface IProps {
  error?: boolean;
  show: boolean;
  message: string;
  onHide: () => void;
}
export const PopupAlert = ({ show, error, message, onHide }: IProps) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        {error ? (
          <AlertError message={message} onHide={onHide} />
        ) : (
          <AlertSuccess message={message} onHide={onHide} />
        )}
      </Modal.Body>
    </Modal>
  );
};
