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
  signUp: (signUpData: SignUpData) => Promise<void>;
  logout: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: async (loginData: LoginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, loginData);
      if (response.status === 200) {
        const { token, expiresIn, userId, userName, isAdmin } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("expiresIn", expiresIn.toString());
        set({ user: { userName, userId, isAdmin } });
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  signUp: async (signUpData: SignUpData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, signUpData);
      if (response.status === 201) {
        await useUserStore.getState().login({
          email: signUpData.email,
          password: signUpData.password,
        });
      }
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    set({ user: null });
  },
}));
