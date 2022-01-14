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
  else if (newPassword !== confirmPassword)
    result = 'Mật khẩu xác nhận không trùng khớp';
  else if (!validatePassword(newPassword))
    result = 'Độ dài mật khẩu từ 8-16 kí tự';

  return result;
};

// convert miliseconds to date form 'HH/MM/SS'.
export const convertMilisecondsToString = (miliseconds: number): string => {
  const seconds = Math.floor((miliseconds / 1000) % 60);
  const minutes = Math.floor((miliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);

  const hoursInString = hours < 10 ? '0' + hours : hours;
  const minutesInString = minutes < 10 ? '0' + minutes : minutes;
  const secondsInString = seconds < 10 ? '0' + seconds : seconds;

  if(hours<1) return minutesInString + ':' + secondsInString;
  else return hoursInString + ':' + minutesInString + ':' + secondsInString;
};

export const translateApiErrorMessage = (
  type: string,
  message: string
): string => {
  switch (type) {
    case 'email':
      return translateEmailErrorMessage(message);
    case 'code':
      return translateCodeErrorMessage(message);
    default:
      return message;
  }
};

const translateEmailErrorMessage = (message: string): string => {
  switch (message) {
    case 'User does not exist':
      return 'Email không tồn tại.';
    default:
      return message;
  }
};

const translateCodeErrorMessage = (message: string): string => {
  if(message.startsWith('Confirmation code', 0))
  {
    return `Mã xác thực không chính xác.`
  }

  switch (message) {
    case 'Invalid confirmation, you have maximum 10 minutes to confirm. Try again':
      return 'Mã xác thực không còn hiệu lực. Thử lại sau.';
  
    default:
      return message;
  }
};
