import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";

const demoUsers = [
  {
    id: "1",
    name: "Demo Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    image: "https://i.pravatar.cc/150?u=admin@example.com",
  },
  {
    id: "2",
    name: "Demo Inspector",
    email: "inspector@example.com",
    password: "inspector123",
    role: "inspector",
    image: "https://i.pravatar.cc/150?u=inspector@example.com",
  },
  {
    id: "3",
    name: "Demo Reviewer",
    email: "reviewer@example.com",
    password: "reviewer123",
    role: "reviewer",
    image: "https://i.pravatar.cc/150?u=reviewer@example.com",
  },
];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      tenantId: "common",
    }),
    CredentialsProvider({
      name: "Demo Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = demoUsers.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };