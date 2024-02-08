import axios from "axios";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  token: string;
  expiresIn: number;
  userId: string;
  userName: string;
  isAdmin: boolean;
}
const BASE_URL = "http://localhost:4401/api";

export const signUp = async (userData: SignUpData): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData);
    if (response.status === 201) {
      return Promise.resolve();
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const login = async (loginData: LoginData): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, loginData);
    if (response.status === 200) {
      const { token, expiresIn, userId, userName, isAdmin } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiresIn.toString());
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("isAdmin", isAdmin.toString());
      return Promise.resolve();
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const isTokenExpired = (): boolean => {
  const expiresIn = localStorage.getItem("expiresIn");
  if (!expiresIn) return true;
  const expiresInMs = parseInt(expiresIn) * 1000; // Convert seconds to milliseconds
  const expirationDate = new Date(expiresInMs);
  return expirationDate.getTime() < Date.now();
};

export const getUserFromLocalStorage = (): UserData | null => {
  const token = localStorage.getItem("token");
  const expiresIn = localStorage.getItem("expiresIn");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const isAdmin = localStorage.getItem("isAdmin");

  if (token && expiresIn && userId && userName && isAdmin) {
    return {
      token,
      expiresIn: parseInt(expiresIn),
      userId,
      userName,
      isAdmin: isAdmin === "true",
    };
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("isAdmin");
};
