import { find } from 'lodash';
import { FormError } from '../types';
import { isNumeric } from 'utils/number';

export const getErrors = (errors: FormError[]) => {
  const titleError = find(errors, { errorType: 'title' });
  const gradeError = find(errors, { errorType: 'grade' });
  return {
    titleError,
    gradeError
  };
};


const getErrorMessage = (
    errorType: FormError['errorType'],
    value: string
  ): string => {
    switch (errorType) {
      case 'title':
        if (value === '' )
          return 'Bạn chưa nhập nội dung';
        break;
      case 'grade':
        if(value === '')
          return 'Bạn chưa nhập điểm'
        else if(!isNumeric(value)&& !(Number(value)>0))
          return 'Vui lòng chỉ nhập số > 0';
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
