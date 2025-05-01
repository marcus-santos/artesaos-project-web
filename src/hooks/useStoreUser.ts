import { create } from "zustand";
import { UserProps, UserStore } from "@/types/UserProps";

const useStoreUser = create<UserStore>((set) => ({
  user: {
    userName: "",
    userPhoto: "",
    isAuthenticated: false,
  },
  setUser: (user: UserProps) =>
    set(() => ({
      user: {
        userName: user.userName,
        userPhoto: user.userPhoto,
        isAuthenticated: true,
      },
    })),
  resetStore: () =>
    set(() => ({
      user: {
        userName: "",
        userPhoto: "",
        isAuthenticated: false,
      },
    })),
}));

export default useStoreUser;
