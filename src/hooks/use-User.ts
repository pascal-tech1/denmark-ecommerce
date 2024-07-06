import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface useUserData {
  user: { firstName: string; lastName: string; email: string };
  updatUser: (user: object) => void;
}

export const useLoginUser = create(
  persist<useUserData>(
    (set, get) => ({
      user: { firstName: "", lastName: "", email: "" },
      updatUser: (user: any) => {
        set({ user });
      }
    }),
    {
      name: "user"
    }
  )
);
