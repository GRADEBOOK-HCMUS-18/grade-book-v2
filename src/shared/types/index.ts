export type UserAuthen = {
  userName: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
};

export type StateType = 'success' | 'error' | 'warning' | null;
