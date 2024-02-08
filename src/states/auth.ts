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
import { useToast } from "@chakra-ui/react";

export const signUp = async (userData: SignUpData): Promise<void> => {
  const toast = useToast();
  try {
    const response = await axios.post(
      "http://localhost/:4401/api/users/signup",
      userData
    );
    if (response.status === 201) {
      toast({
        title: "Success",
        description: "User created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "An error occurred while creating the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
};

export const login = async (loginData: LoginData): Promise<void> => {
  const toast = useToast();
  try {
    const response = await axios.post(
      "http://localhost/:4401/api/users/login",
      loginData
    );
    if (response.status === 200) {
      const { token, expiresIn, userId, userName, isAdmin } = response.data;
      // Save token and user details to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiresIn.toString());
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("isAdmin", isAdmin.toString());
      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Authentication failed. Incorrect email or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
