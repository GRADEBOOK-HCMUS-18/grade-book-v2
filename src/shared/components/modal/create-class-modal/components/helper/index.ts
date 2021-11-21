import { find } from 'lodash';
import { FormError } from '../types';

export const getErrors = (errors: FormError[]) => {
  const nameError = find(errors, { errorType: 'name' });
  return {
    nameError
  };
};

const getErrorMessage = (
    errorType: FormError['errorType'],
    value: string
  ): string => {
    switch (errorType) {
      case 'name':
        if (value === '' )
          return 'Vui lòng nhập tên lớp đầy đủ';
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
