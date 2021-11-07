import { observer } from 'mobx-react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { googleProvider, facebookProvider } from 'firebase-services/provider';
import { socialLogin } from 'firebase-services/auth';
import { HomeViewModel } from './home-view-models';

export const HomePage = observer(() => {
  const [viewModal] = useState(new HomeViewModel());

  const handleClick = () => {
    viewModal.getTodoById();
  };

  const loginWithGoogle = () => {
    socialLogin(googleProvider);
  };

  const loginWithFacebook = () => {
    socialLogin(facebookProvider);
  };

  return (
    <div>
      <p>{viewModal.todo.name}</p>
      <Button variant="primary" onClick={loginWithGoogle}>
        Login with google
      </Button>
      <button onClick={loginWithFacebook}>Login with facebook</button>
      <button onClick={handleClick}>Get random to do</button>
    </div>
  );
});
