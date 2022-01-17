export const isPositiveNumber = (val: string) => {
  const re = /^-?\d+$/;
  return re.test(val);
};

export const isNumeric = (val: any):boolean => {
  return !isNaN(parseFloat(val)) && isFinite(val);
};
