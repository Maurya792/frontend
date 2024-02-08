import CredentialsProvider from "next-auth/providers/credentials";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthOptions } from "@/next-auth";
import { login, verifyAccount } from "@/api/server-actions/auth-actions";
import { getUser } from "@/api/server-actions/user-actions";
import { translate } from "@/lib/locales/translate";
import {
  ErrorFragmentDoc,
  UserFragmentDoc,
} from "@/api/__generated__/graphql/graphql";
import { CLIENT_TOKEN_INFO } from "../apollo/apollo-client/tokens/client-token";
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // ? Could be used in future.
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger == "update" && session.user) {
        token.user = { ...session.user, accessToken: token.accessToken };
      }
      if (user) {
        token.accessToken = user.accessToken;
        token.user = { ...user, email: user.email!, id: Number(user.id) };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = token.user;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.expires = new Date().toISOString();
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12, // half day,
  },
  providers: [
    CredentialsProvider({
      id: "signIn",
      name: "signIn",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        if (credentials?.email && credentials.password) {
          const res = await login({
            username: credentials.email,
            password: credentials.password,
          });
          const errors = res.data?.login.errors;
          if (res.errors) {
            throw new Error(res.errors[0]?.message);
          }
          if (errors?.[0]) {
            throw new Error(errors[0].message);
          }
          CLIENT_TOKEN_INFO.authToken = res.data?.login.accessToken;
          const userFromToken = jwt.decode(
            res.data?.login.accessToken!
          ) as AccessTokenData;
          const { data, error } = await getUser({
            id: userFromToken.userId,
          });
          const user = data;
          if (error) {
            throw new Error(error.message);
          }
          if (!user) {
            throw new Error(`User ${userFromToken.username} not found!`);
          }

          return typeof user !== "string"
            ? {
                ...user,
                id: String(user.id),
                accessToken: res.data?.login.accessToken!,
                email: user.username,
                name: user.name,
                image: user.name,
              }
            : null;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    {
      id: "verify",
      name: "Verify",
      type: "credentials",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.token) {
          // const res = await verifyAccount({
          //   token: credentials?.token,
          // });
          // if (res.verifyAccount.errors) {
          //   throw new Error(res.verifyAccount.errors[0].message);
          // }
          // const userFromToken = jwt.decode(
          //   res.verifyAccount.accessToken!
          // ) as AccessTokenData;
          // const userRes = await getUser(
          //   userFromToken.userId,
          //   res.verifyAccount.accessToken!
          // );
          // const user = userRes.getUser;
          // if (!user) {
          //   throw new Error(`User ${userFromToken.email} not found!`);
          // }
          // const name =
          //   user.firstName || user.lastName
          //     ? [user.firstName, user.lastName]
          //         .filter((i) => i && !!(i.length > 0))
          //         .join(" ")
          //     : user.username;
          // return typeof user !== "string"
          //   ? {
          //       ...user,
          //       id: String(user.id),
          //       accessToken: res.verifyAccount.accessToken!,
          //       name,
          //       image: user.profilePicture?.url,
          //     }
          //   : null;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    },
  ],
};
