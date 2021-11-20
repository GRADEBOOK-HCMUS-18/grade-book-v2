import { useEffect } from 'react';
import { HttpError } from 'shared/errors';
import { httpService } from 'shared/services';
import { UserStore } from 'shared/types';
import { userViewModel } from 'shared/view-models';

export const Authentication = ({ children }: any) => {
  useEffect(() => {
    const tryGetUser = async () => {
      const response: UserStore | HttpError = await httpService.sendGet(
        '/User',
        httpService.getBearerToken()
      );
      if (response instanceof HttpError) {
      } else {
        userViewModel.updateUser(response);
      }
    };
    tryGetUser();
  }, []);

  return <>{children}</>;
};
