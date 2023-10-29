import { IUser } from "@/interfaces/common";
import NextAuth, { DefaultSession } from "next-auth";

export type IRole = "ADMIN" | "CUSTOMER" | "SUPER_ADMIN";

declare module "next-auth" {
  type User = {
    role: IRole;
  } & DefaultSession["user"];
  interface Session {
    user: {
      id: string | undefined;
      role: IRole | undefined;
    } & DefaultSession["user"];
  }
}
