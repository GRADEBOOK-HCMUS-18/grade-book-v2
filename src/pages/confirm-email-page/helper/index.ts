export const getVerificationCodeError = (code: string): string => {
  let result: string = '';
  if (code === '') result = 'Vui lòng nhập mã xác thực.';
  else if (code.length < 12 || code.length > 12)
    result = 'Độ dài mã xác thực 12 ký tự';

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

  if (hours < 1) return minutesInString + ':' + secondsInString;
  else return hoursInString + ':' + minutesInString + ':' + secondsInString;
};


export const translateCodeErrorMessage = (message: string): string => {
  switch (message) {
    case 'Invalid confirmation, you have maximum 10 minutes to confirm. Try again':
      return 'Mã xác thực không hợp lệ';
    case 'code is overtime':
      return 'Mã xác thực không còn hiệu lực';
    default:
      return '';
  }
};
