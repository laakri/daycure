import { useUserStore } from "../../stores/user";

export const useUserData = () => {
  const { user } = useUserStore();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
