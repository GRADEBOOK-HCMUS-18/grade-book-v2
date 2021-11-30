export const  isPositiveNumber = (val:string) =>{
    const re =  /^-?\d+$/;
    return re.test(val);
  }