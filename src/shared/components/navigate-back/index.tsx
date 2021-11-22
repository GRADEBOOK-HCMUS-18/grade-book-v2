import { IoArrowBackOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import './index.css';

export const NavigateBack = () => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.goBack()}
      className="navigate-back center-horizontal"
    >
      <IoArrowBackOutline size={25} />
    </div>
  );
};
