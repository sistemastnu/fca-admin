import User from "@/models/User";
import sequelize from "@/lib/sequelize";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "username",
          placeholder: "John Doe",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await sequelize.sync();
        const user = await User.findOne({
          where: { username: credentials.username },
        });

        if (user) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isValidPassword) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              role: user.rol,
            };
          } else {
            throw new Error("Invalid email or password");
          }
        } else {
          throw new Error("Credenciales invalidas");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
