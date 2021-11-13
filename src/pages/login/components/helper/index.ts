import {
  validateEmailAddress,
  validatePassword,
  validateUserName,
  validateFirstLastName,
} from 'utils/regex';
import { find } from 'lodash';
import { FormError } from '../types';

export const getErrors = (errors: FormError[]) => {
  const emailError = find(errors, { errorType: 'email' });
  const userNameError = find(errors, { errorType: 'username' });
  const passwordError = find(errors, { errorType: 'password' });
  const reInputPasswordError = find(errors, { errorType: 'reInputPassword' });
  const firstNameError = find(errors, { errorType: 'firstName' });
  const lastNameError = find(errors, { errorType: 'lastName' });

  return {
    emailError,
    userNameError,
    passwordError,
    reInputPasswordError,
    firstNameError,
    lastNameError,
  };
};

const getErrorMessage = (
  errorType: FormError['errorType'],
  value: string,
  password?: string
): string => {
  switch (errorType) {
    case 'email':
      if (value === '' || !validateEmailAddress(value))
        return 'Vui lòng nhập email hợp lệ';
      break;
    case 'username':
      if (value === '' || !validateUserName(value))
        return 'Độ dài tên đằng nhập từ 6-32 kí tự';
      break;
    case 'lastName':
      if (value === '' || !validateFirstLastName(value))
        return 'Độ dài họ từ 1-32 kí tự';
      break;
    case 'firstName':
      if (value === '' || !validateFirstLastName(value))
        return 'Độ dài tên từ 1-32 kí tự';
      break;
    case 'password':
      if (value === '' || !validatePassword(value))
        return 'Độ dài mật khẩu từ 8-16 kí tự';
      break;
    case 'reInputPassword':
      if (password && value !== password) return 'Mật khẩu không khớp';
      break;
    default:
      return '';
  }
  return '';
};

export const getErrorsState = (formValue: any) => {
  let newErrors: FormError[] = [];
  Object.keys(formValue).forEach((key: any) => {
    let errorMessage;
    if (key === 'reInputPassword') {
      errorMessage = getErrorMessage(
        key,
        formValue[key],
        formValue['password']
      );
    } else {
      errorMessage = getErrorMessage(key, formValue[key]);
    }
    if (errorMessage !== '') {
      newErrors.push({ errorType: key, errorMessage: errorMessage });
    }
  });
  return newErrors;
};
