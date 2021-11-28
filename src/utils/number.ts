export const  isNumeric = (val:string) =>{
    const re =  /^-?\d+$/;
    return re.test(val);
  }