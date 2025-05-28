import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  hobbies: string[];
}

type UserStoreState = {
  users: IUser[];
  addUser: (user: Omit<IUser, "id">) => void;
  deleteUser: (id: string) => void;
};

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) => {
        const newUser = {
          ...user,
          id: uuidv4(),
        };
        set((state) => ({ users: [...state.users, newUser] }));
      },
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
    }),
    { name: "userinfo-storage" }
  )
);
