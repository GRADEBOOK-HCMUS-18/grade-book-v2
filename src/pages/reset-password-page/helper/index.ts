import { validateEmailAddress, validatePassword } from 'utils/regex';

export const getEmailError = (email: string): string => {
  let result: string = '';
  if (email === '') result = 'Vui lòng nhập email';
  else if (!validateEmailAddress(email)) result = 'Vui lòng nhập email hợp lệ';
  return result;
};

export const getVerificationCodeError = (code: string): string => {
  let result: string = '';
  if (code === '') result = 'Vui lòng nhập mã xác thực.';
  else if (code.length < 12 || code.length > 12)
    result = 'Độ dài mã xác thực 12 ký tự';

  return result;
};

export const getPasswordError = (
  newPassword: string,
  confirmPassword?: string
): string => {
  let result: string = '';

  if (newPassword === '') result = 'Vui lòng nhập password mới';
  else
    if (newPassword === confirmPassword)
      result = 'Mật khẩu xác nhận không trùng khớp';
    else if (!validatePassword(newPassword))
      result = 'Độ dài mật khẩu từ 8-16 kí tự';

  return result;
};


export const translateApiErrorMessage = (type:string, message:string):string=>{
  switch(type){
    case 'email':
      return translateEmailErrorMessage(message);
    case 'code':
      return translateCodeErrorMessage(message);
    default:
      return '';
  }
}

const translateEmailErrorMessage = (message:string):string=>{
  switch(message){
    case 'email does not exist':
      return 'Email không tồn tại.';
      break;
    default:
      return '';
      break;
  }
}

const translateCodeErrorMessage = (message:string):string=>{
  switch(message){
    case 'code does not exist':
      return 'Mã xác thực không hợp lê';
      break;
    case 'code is overtime':
      return 'Mã xác thực không còn hiệu lực'
      break;
    default:
      return '';
      break;
  }
}