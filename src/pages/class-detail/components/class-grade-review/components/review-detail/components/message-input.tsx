import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { Avatar } from 'shared/components';
import { userViewModel } from 'shared/view-models';
import '../style/index.css';

const initPlaceHolder = 'Thêm nhận xét';

interface IProps {
  sendMessage: (content: string) => void;
}

export const MessageInput = observer(({ sendMessage }: IProps) => {
  const [value, setValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [placeHolder, setPlaceHolder] = useState(initPlaceHolder);

  const user = userViewModel.user;

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      setIsEmpty(true);
      setValue('');
    } else {
      const text = event.target.textContent.trim();
      setValue(text);

      if (text !== '') {
        setIsEmpty(false);
        setPlaceHolder('');
      } else {
        setIsEmpty(true);
        setPlaceHolder(initPlaceHolder);
      }
    }
  };
  return (
    <div className="review-message-input-container">
      <Avatar user={user} size={40} />
      <div
        tabIndex={0}
        contentEditable
        onKeyUp={handleKeyUp}
        onFocus={() => setPlaceHolder('')}
        onBlur={() => {
          value === '' && setPlaceHolder(initPlaceHolder);
        }}
        className="review-message-input"
      ></div>
      <span className="review-placeholder">{placeHolder}</span>
      <AiOutlineSend
        onClick={() => !isEmpty && sendMessage(value)}
        className={isEmpty ? 'send-icon' : 'send-icon-blue'}
        size={30}
      />
    </div>
  );
});
