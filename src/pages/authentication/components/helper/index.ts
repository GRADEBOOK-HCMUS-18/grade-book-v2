import { find } from 'lodash';
import {
  validateEmailAddress,
  validatePassword,
  validateFirstLastName,
} from 'utils/regex';
import { FormError } from '../types';

export const getErrors = (errors: FormError[]) => {
  const emailError = find(errors, { errorType: 'email' });
  const passwordError = find(errors, { errorType: 'password' });
  const firstNameError = find(errors, { errorType: 'firstName' });
  const lastNameError = find(errors, { errorType: 'lastName' });

  return {
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
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
    case 'password':
      if (value === '' || !validatePassword(value))
        return 'Độ dài mật khẩu từ 8-16 kí tự';
      break;

    default:
      return '';
  }
  return '';
};

export const getErrorsState = (formValue: any) => {
  let newErrors: FormError[] = [];
  Object.keys(formValue).forEach((key: any) => {
    const errorMessage = getErrorMessage(key, formValue[key]);
    if (errorMessage !== '') {
      newErrors.push({ errorType: key, errorMessage: errorMessage });
    }
  });
  return newErrors;
};
