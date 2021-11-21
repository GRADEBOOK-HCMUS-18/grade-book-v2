import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { Loading } from 'shared/components';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { UserStore } from 'shared/types';
import { userViewModel } from 'shared/view-models';
import { ErrorContainer } from './Error';

export const Authentication = observer(({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const tryGetUser = async () => {
      userViewModel.startLoading();
      const response: UserStore | HttpError = await httpService.sendGet(
        '/User',
        httpService.getBearerToken()
      );

      if (response instanceof HttpError) {
        setIsError(true);
      } else {
        userViewModel.updateUser(response);
        setIsLogin(true);
      }
      userViewModel.stopLoading();
    };
    tryGetUser();
  }, []);

  const container = isError ? (
    <ErrorContainer />
  ) : (
    <Loading isLoading={userViewModel.loading} />
  );

  return <>{isLogin ? children : container}</>;
});
