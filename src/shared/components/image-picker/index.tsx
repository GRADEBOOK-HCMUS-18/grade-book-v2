import { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { PopupAlert } from '..';
import './style/index.css';

interface IProps {
  content: string;
  onFinish: (data: any) => void;
}

const acceptImage = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png'];

export const ImagePicker = ({ content, onFinish }: IProps) => {
  const [isError, setIsError] = useState(false);
  const handleChange = (event: any) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    const image: any = formData.get('image');
    if (acceptImage.includes(image.type)) {
      onFinish(formData);
    } else {
      setIsError(true);
    }
  };
  return (
    <>
      <label htmlFor="image-input">
        <div className="image-picker">
          <AiOutlineCamera size={20} />
          <span>{content}</span>
        </div>
      </label>
      <input
        type="file"
        id="image-input"
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
      <PopupAlert
        show={isError}
        error={isError}
        onHide={() => setIsError(false)}
        message="File không hợp lệ"
      />
    </>
  );
};
