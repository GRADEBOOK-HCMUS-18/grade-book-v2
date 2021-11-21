import { find } from 'lodash';
import {
  validateEmailAddress,
  validatePassword,
  validateFirstLastName,
} from 'utils/regex';

export type FormError = {
  errorType: 'email' | 'firstName' | 'lastName' | 'oldPassword' | 'newPassword';
  errorMessage: string;
};

export const getErrors = (errors: FormError[]) => {
  const emailError = find(errors, { errorType: 'email' });
  const firstNameError = find(errors, { errorType: 'firstName' });
  const lastNameError = find(errors, { errorType: 'lastName' });
  const oldPassError = find(errors, { errorType: 'oldPassword' });
  const newPassError = find(errors, { errorType: 'newPassword' });

  return {
    emailError,
    firstNameError,
    lastNameError,
    oldPassError,
    newPassError,
  };
};

const getErrorMessage = (
  errorType: FormError['errorType'],
  value: string
): string => {
  switch (errorType) {
    case 'email':
      if (value === '' || !validateEmailAddress(value))
        return 'Vui lòng nhập email hợp lệ';
      break;
    case 'lastName':
      if (value === '' || !validateFirstLastName(value))
        return 'Độ dài họ từ 1-32 kí tự';
      break;
    case 'firstName':
      if (value === '' || !validateFirstLastName(value))
        return 'Độ dài tên từ 1-32 kí tự';
      break;
    case 'oldPassword':
      if (value === '' || !validatePassword(value))
        return 'Độ dài mật khẩu từ 8-16 kí tự';
      break;
    case 'newPassword':
      if (value === '' || !validatePassword(value))
        return 'Độ dài tên từ 8-16 kí tự';
      break;
    default:
      return '';
  }
  return '';
};

export const getErrorsState = (formValue: any, isPasswordNotSet: boolean) => {
  let newErrors: FormError[] = [];
  Object.keys(formValue).forEach((key: any) => {
    const errorMessage = getErrorMessage(key, formValue[key]);
    if (errorMessage !== '') {
      if (key === 'oldPassword' && isPasswordNotSet) {
      } else newErrors.push({ errorType: key, errorMessage: errorMessage });
    }
  });
  return newErrors;
};
