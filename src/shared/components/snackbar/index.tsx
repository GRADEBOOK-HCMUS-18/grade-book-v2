import { useEffect, useState } from 'react';
import { FeedBack } from 'shared/types';
import './index.css';

interface IProps {
  show: boolean;
  onClose: () => void;
  duration?: number;
  message: string;
  type: FeedBack;
}

export const SnackBar = ({
  show,
  duration,
  message,
  type,
  onClose,
}: IProps) => {
  const [baseClassName, setBaseClassName] = useState('snackbar');
  const [count, setCount] = useState(0);
  let className = 'success-snackbar';

  switch (type) {
    case 'error':
      className = 'error-snackbar';
      break;
    case 'warning':
      className = 'warning-snackbar';
      break;
  }
  useEffect(() => {
    if (show) {
      setBaseClassName('snackbar');
      setCount(count + 1);
    } else {
      setBaseClassName('snackbar-close');
    }
  }, [show, count]);

  useEffect(() => {
    let timeout: any;
    if (duration) timeout = setTimeout(() => onClose(), duration);
    else timeout = setTimeout(() => onClose(), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <>
      {count ? (
        <div className={`${baseClassName} ${className}`}>
          <span>{message}</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
