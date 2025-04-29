import { create } from "zustand";

const useStore = create((set) => ({
  UserName: "",
  UserRole: "",
  authenticated: false,
  setUserName: (name: string) => set(() => ({ UserName: name })),
  setUserRole: (role: string) => set(() => ({ UserRole: role })),
}));

export default useStore;
