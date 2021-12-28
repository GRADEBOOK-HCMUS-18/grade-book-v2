import { useState, useEffect } from 'react';
import { fileService } from 'shared/services';
import { PopupAlert } from '../popup-alert';
import './style/index.css';

interface IProps {
  content: string;
  onFinish: (data: any) => void;
  acceptTypes: string[];
  isMulti?: boolean;
}

export const FilePicker = ({ content, onFinish, acceptTypes }: IProps) => {
  const [isError, setIsError] = useState(false);

  const handleChange = (event: any) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    const file: any = formData.get('file');
    const tokens = file.name.split('.');
    const type = tokens[tokens.length - 1];

    if (acceptTypes.includes(type)) {
      returnData(file);
    } else {
      setIsError(true);
    }
  };

  const returnData = async (file: any) => {
    const data = await fileService.readFile(file);
    onFinish(data);
  };
  return (
    <>
      <label htmlFor="file-input">
        <span>{content}</span>
      </label>
      <input type="file" id="file-input" onChange={handleChange} />
      <PopupAlert
        show={isError}
        error={isError}
        onHide={() => setIsError(false)}
        message="File không hợp lệ"
      />
    </>
  );
};
