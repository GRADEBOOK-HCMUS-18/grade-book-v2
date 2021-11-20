export type UserAuthen = {
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  defaultProfilePictureHex?: string;
};

export type UserResponse = {
  defaultProfilePictureHex: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  token: string;
  isPasswordNotSet: boolean;
};

export type UserStore = {
  defaultProfilePictureHex: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  displayName: string;
  isPasswordNotSet: boolean;
};
