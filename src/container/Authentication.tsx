import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { UserStore } from 'shared/types';
import { userViewModel } from 'shared/view-models';

export const Authentication = observer(({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const tryGetUser = async () => {
      const response: UserStore | HttpError = await httpService.sendGet(
        '/User',
        httpService.getBearerToken()
      );

      if (response instanceof HttpError) {
      } else {
        userViewModel.updateUser(response);
        setIsLogin(true);
      }
    };
    tryGetUser();
  }, []);

  return <>{isLogin ? children : <></>}</>;
});
