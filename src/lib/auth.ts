import { ILoginResponse } from "@/interfaces/common";
import axios from "axios";

type LoginFn = (email: string, password: string) => Promise<any>;

export const login: LoginFn = async (email, password) => {
  const result = await axios.post("http://localhost:5000/api/v1/auth/login", {
    email,
    password,
  });

  return result.data;
};
