import { find } from 'lodash';
import { FormError } from '../types';

export const getErrors = (errors: FormError[]) => {
  const descriptionError = find(errors, { errorType: 'description' });
  const requestedNewPointError = find(errors, { errorType: 'requestedNewPoint' });
  return {
    descriptionError,
    requestedNewPointError,
  };
};

const getErrorMessage = (
  errorType: FormError['errorType'],
  value: string
): string => {
  switch (errorType) {
    case 'description':
      if (value === '') return 'Bạn chưa nhập nội dung';
      break;
    case 'requestedNewPoint':
      if (value === '') return 'Bạn chưa nhập điểm mong muốn';
      else if (isNaN(Number.parseFloat(value))) return 'Vui lòng chỉ nhập số';
      else if (Number.parseFloat(value) < 0) return 'Vui lòng nhập số > 0';

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

export const XORLogic=(A: boolean, B:boolean):boolean=>
{
  if((A||B)&&!(A&&B))
    return true;
  else 
    return false;
}