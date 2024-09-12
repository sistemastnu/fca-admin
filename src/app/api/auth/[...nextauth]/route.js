import User from "@/models/User";
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
        const user = await User.findOne({
          where: { username: credentials.username },
        });

        if (user) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isValidPassword) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            throw new Error("Invalid email or password");
          }
        } else {
          throw new Error("Credenciales invalidas");
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
