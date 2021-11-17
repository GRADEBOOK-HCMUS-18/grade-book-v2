import { USER_KEY } from 'shared/constants';
import { storageService } from 'shared/services';
import { userViewModel } from 'shared/view-models';

export const MemoUser = ({ children }: any) => {
  const user = storageService.getLocalStorage(USER_KEY);
  if (user && userViewModel.getUser().email === '') {
    const userInfo = JSON.parse(user);
    userViewModel.updateUser(userInfo);
  }
  return <>{children}</>;
};
