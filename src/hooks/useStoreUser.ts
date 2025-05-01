import { create } from "zustand";
import { UserProps } from "@/types/UserProps";

const useStoreUser = create((set) => ({
  user: {},
  resetStore: () =>
    set(() => ({
      userName: "",
      userPhoto: "",
      authenticated: false,
    })),
  setUser: (user: UserProps) =>
    set(() => ({
      userName: user.userName,
      userPhoto: user.userPhoto,
      authenticated: true,
    })),
}));

export default useStoreUser;
