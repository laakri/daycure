import axios from "axios";
import { create } from "zustand";

const BASE_URL = "http://localhost:4401/api";

interface User {
  userName: string;
  userId: number;
  isAdmin: boolean;
}

interface UserStore {
  user: User | null;
  login: (loginData: LoginData) => Promise<void>;
}

interface LoginData {
  email: string;
  password: string;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: async (loginData: LoginData) => {
    const response = await axios.post(`${BASE_URL}/users/login`, loginData);
    if (response.status === 200) {
      const { token, expiresIn, userId, userName, isAdmin } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiresIn.toString());
      set({ user: { userName, userId, isAdmin } });
    }
  },
}));
