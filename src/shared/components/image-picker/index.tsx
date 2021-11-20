import { AiOutlineCamera } from 'react-icons/ai';
import './style/index.css';

interface IProps {
  content: string;
  onFinish: (data: any) => void;
}
export const ImagePicker = ({ content, onFinish }: IProps) => {
  const handleChange = (event: any) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    formData.forEach((e) => console.log(e));
    onFinish(formData);
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
    </>
  );
};
