import { validateEmailAddress, validatePassword } from 'utils/regex';


export const getEmailError = (email: string): string => {
    let result :string = '';
    if ( email === '') 
      result =  'Vui lòng nhập email';
    else if( !validateEmailAddress(email))
      result = 'Vui lòng nhập email hợp lệ';
    return result;
};

export const getVerificationCodeError = (code:string):string =>{
  let result:string = '';
  if(code ==='')
    result = 'Vui lòng nhập code đã được gửi'
  else if(code.length<6 || code.length >6)
    result = 'Vui lòng nhập đúng 6 ký tự';
  
  return result ;
}

export const getPasswordError = (password:string):string =>{
  let result:string = '';
  if(password ==='')
    result = 'Vui lòng nhập password mới';
  else if(!validatePassword(password))
    result = 'Độ dài mật khẩu từ 8-16 kí tự';
  
  return result ;
}