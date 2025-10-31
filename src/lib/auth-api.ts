import type z from "zod";
import type {
  emailSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "./auth-schema";
import api from "./axios";

export const loginUser = async (values: z.infer<typeof loginSchema>) => {
  try {
    const res = await api.post("/auth/login", values, {
      headers: { "User-Agent": navigator.userAgent },
    });
    return res.data;
  } catch (error) {
    console.log("An error occured.", error);
  }
};

export const signupUser = async (values: z.infer<typeof signupSchema>) => {
  try {
    const res = await api.post("/auth/signup", values);
    return res.data;
  } catch (error) {
    console.log("An error occured.", error);
  }
};

export const verifyUserEmail = async (token: string) => {
  try {
    const res = await api.post(`/auth/email/verify?token=${token}`, null, {
      headers: { "User-Agent": navigator.userAgent },
    });
    return res.data;
  } catch (error) {
    console.log("An error occured.", error);
  }
};

export const forgotUserPassword = async (
  values: z.infer<typeof emailSchema>
) => {
  try {
    const res = await api.post("/auth/password/forgot", values);
    return res.data;
  } catch (error) {
    console.log("An error occured.", error);
  }
};

export const verifyPasswordResetToken = async (token: string) => {
  try {
    const res = await api.get(`/auth/password/reset?token=${token}`);
    return res.data;
  } catch (error) {
    console.log("An error occured.", error);
  }
};

export const resetUserPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  try {
    const res = await api.post("/auth/password/reset", values);
    return res.data;
  } catch (error) {
    console.log("An error occured.", error);
  }
};
