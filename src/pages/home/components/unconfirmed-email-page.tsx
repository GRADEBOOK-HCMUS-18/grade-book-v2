import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import { MdOutlineEmail } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { User } from 'shared/models';
import { userViewModel } from 'shared/view-models';

export const UnconfirmedEmailPage = observer(() => {
  const history = useHistory();
  const user: User = userViewModel.user;
  const handleClick = () => {
    if (user.isEmailConfirmed === false) {
      const waitforResult = async () => {
        const result = await userViewModel.sendConfirmationCode();
        if (result) history.push('/confirm');
        else history.push('/');
      };
      waitforResult();
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: '70vh' }}
    >
      <MdOutlineEmail size={200} style={{ color: 'blue' }} />
      <span
        className="me-3 mb-3"
        style={{ fontSize: '2rem', fontWeight: 'bold' }}
      >
        Bạn chưa xác thực email
      </span>
      <Button
        onClick={handleClick}
        color="lightBlue"
        style={{ fontSize: '1.5rem' }}
      >
        <strong>Xác thực ngay</strong>
      </Button>
    </div>
  );
});
