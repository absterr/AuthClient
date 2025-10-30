import type z from "zod";
import type { loginSchema, signupSchema } from "./auth-schema";
import api from "./axios";

export const loginUser = async (values: z.infer<typeof loginSchema>) => {
  try {
    const res = await api.post("/auth/login", {
      ...values,
      headers: navigator.userAgent,
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
