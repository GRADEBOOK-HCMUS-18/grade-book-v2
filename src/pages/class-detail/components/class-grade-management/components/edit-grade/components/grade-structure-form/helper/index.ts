import { find } from 'lodash';
import { FormError } from '../types';

export const getErrors = (errors: FormError[]) => {
  const nameError = find(errors, { errorType: 'name' });
  const pointError = find(errors, { errorType: 'point' });
  return {
    nameError,
    pointError,
  };
};

const getErrorMessage = (
  errorType: FormError['errorType'],
  value: string
): string => {
  switch (errorType) {
    case 'name':
      if (value === '') return 'Bạn chưa nhập nội dung';
      break;
    case 'point':
      if (value === '') return 'Bạn chưa nhập điểm';
      else if (isNaN(Number.parseInt(value))) return 'Vui lòng chỉ nhập số';
      else if (Number.parseInt(value) < 0) return 'Vui lòng nhập số > 0';
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
