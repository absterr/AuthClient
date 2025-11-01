import api from "./axios";
import handleFallbackMessage from "./handleFallbackMessage";

export type GetUserResponse = {
  success: boolean;
  user: {
    name: string;
    email: string;
  };
};

export const getUserDetails = async (): Promise<GetUserResponse> => {
  try {
    const res = await api.get("/");
    return res.data;
  } catch (error) {
    handleFallbackMessage(error, "Unable to fetch user data");
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (error) {
    handleFallbackMessage(
      error,
      "Couldn't log out. Please try again or something"
    );
    throw error;
  }
};
