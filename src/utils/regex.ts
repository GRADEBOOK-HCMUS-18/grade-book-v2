export const validateEmailAddress = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const validatePassword = (password: string) => {
  return password.length >= 6 && password.length <= 16;
};

export const validateUserName = (username: string) => {
  return username.length >= 6 && username.length <= 32;
};

export const validateFirstLastName = (name: string) => {
  return name.length <= 32;
};
