import { create } from "zustand";
import { UserProps, UserStore } from "@/types/UserProps";
import { persist } from "zustand/middleware";

const useStoreUser = create<UserStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "loginStore",
    }
  )
);

export default useStoreUser;
