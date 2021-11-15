export type UserAuthen = {
  username?: string;
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  defaultProfilePictureHex?: string;
  usernameOrEmail?: string;
};

export type UserResponse = {
  defaultProfilePictureHex: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  token: string;
  username: string;
};

export type StateType = 'success' | 'error' | 'warning' | null;
