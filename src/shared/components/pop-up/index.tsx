import { CSSProperties, useEffect, useRef, useState } from 'react';
import './index.css';

interface IProps {
  children: JSX.Element;
  overlay: JSX.Element;
  placement: 'left' | 'right' | 'bottom-left' | 'bottom-right';
  onHide: () => void;
  show: boolean;
  left?: number;
  right?: number;
}

export const PopUp = ({
  children,
  overlay,
  placement,
  onHide,
  show,
  left,
  right,
}: IProps) => {
  const style = getStyle(placement);

  if (left) {
    style.left = left;
  }
  if (right) {
    style.right = right;
  }

  const wrapperRef = useRef(null);
  const isOutSide = useClickOutSide(wrapperRef);

  useEffect(() => {
    if (isOutSide && show) {
      onHide();
    }
  }, [isOutSide, onHide, show]);

  return (
    <div className="pop-up-container">
      {children}
      {show && (
        <div ref={wrapperRef} style={style} className="overlay-container">
          {overlay}
        </div>
      )}
    </div>
  );
};

const getStyle = (placement: IProps['placement']) => {
  let style: CSSProperties = {};

  switch (placement) {
    case 'bottom-left':
      style.right = 5;
      break;
    case 'bottom-right':
      style.left = 5;
      break;
    default:
      style.top = 0;
  }

  return style;
};

const useClickOutSide = (ref: any) => {
  const [isOutSide, setIsOutSide] = useState(false);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOutSide(true);
      } else {
        setIsOutSide(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return isOutSide;
};
