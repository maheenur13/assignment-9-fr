import { login } from "@/lib/auth";
import { IRole } from "@/lib/types";
import { decodedToken } from "@/utils/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        try {
          const { email, password } = credentials;
          if (!email || !password) return null;
          const result: any = await login(
            credentials.email,
            credentials.password
          );
          const userInfo: any = decodedToken(result?.data?.accessToken);
          return {
            name: userInfo.role,
            ...userInfo,
          };
        } catch (e) {
          console.error("yess", e);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub;

      session.user.role = token.name as IRole;
      // delete session.user.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
