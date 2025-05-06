export type UserProps = {
  userName: string;
  userPhoto: string;
  isAuthenticated?: boolean;
};

export type UserStore = {
  user: UserProps;
  setUser: (user: UserProps) => void;
  resetStore: () => void;
};
