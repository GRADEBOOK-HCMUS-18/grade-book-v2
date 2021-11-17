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
};

export type UserStore = {
  defaultProfilePictureHex: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  displayName: string;
};

export type StateType = 'success' | 'error' | 'warning' | null;
