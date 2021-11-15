export type FormError = {
  errorType:
    | 'email'
    | 'username'
    | 'password'
    | 'reInputPassword'
    | 'firstName'
    | 'lastName';
  errorMessage: string;
};
