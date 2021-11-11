export type FormError = {
  errorType: 'email' | 'username' | 'password' | 'reInputPassword';
  errorMessage: string;
};
